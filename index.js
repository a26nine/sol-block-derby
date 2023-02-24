require('dotenv').config();
const { Pool } = require('pg');
const web3 = require('@solana/web3.js');

// Postgres DB connection
const pool = new Pool({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
});

// Node providers
const providers = {
  Alchemy: process.env.ALCHEMY_ENDPOINT,
  Ankr: process.env.ANKR_ENDPOINT,
  Chainstack: process.env.CHAINSTACK_ENDPOINT,
  Pokt: process.env.POKT_ENDPOINT,
  QuickNode: process.env.QUICKNODE_ENDPOINT,
};

// Establish connections
const connections = Object.entries(providers).map(([name, endpoint]) => {
  return {
    name,
    conn: new web3.Connection(endpoint),
  };
});

const timeoutSeconds = 5;
const pauseSeconds = 10;

async function checkProviderSlots() {
  const timestamp = new Date().toISOString();
  try {
    const requests = connections.map(({ name, conn }) =>
      Promise.race([
        conn.getSlot(),
        new Promise((resolve) =>
          setTimeout(() => resolve(0), timeoutSeconds * 1000)
        ),
      ])
        .then((slot) => ({ name, slot }))
        .catch((error) => {
          //   console.error(`Error from ${name}: ${error.message}`);
          return { name, slot: 0 };
        })
    );

    const results = await Promise.all(requests);
    console.log(timestamp);
    results.forEach(({ name, slot }) => console.log(`${name}: ${slot}`));

    const highestSlot = Math.max(...results.map((res) => res.slot));
    const winners = results
      .filter(({ slot }) => slot === highestSlot)
      .map(({ name }) => name);
    console.log('\n');

    const pgClient = await pool.connect();
    await pgClient.query(
      'INSERT INTO rounds (timestamp, alchemy, ankr, chainstack, pokt, quicknode, winners) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [
        timestamp,
        results[0].slot,
        results[1].slot,
        results[2].slot,
        results[3].slot,
        results[4].slot,
        winners.join(', '),
      ]
    );
    console.log('Added to DB!');
    client.release();
  } catch (error) {
    // console.error(error);
  } finally {
    setTimeout(checkProviderSlots, pauseSeconds * 1000);
  }
}

checkProviderSlots();
