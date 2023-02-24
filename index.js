require('dotenv').config();
const web3 = require('@solana/web3.js');

const providers = {
  Alchemy: process.env.ALCHEMY_ENDPOINT,
  Ankr: process.env.ANKR_ENDPOINT,
  Chainstack: process.env.CHAINSTACK_ENDPOINT,
  Pokt: process.env.POKT_ENDPOINT,
  QuickNode: process.env.QUICKNODE_ENDPOINT,
};

const connections = Object.entries(providers).map(([name, endpoint]) => {
  return {
    name,
    conn: new web3.Connection(endpoint),
  };
});

const timeoutSeconds = 5;
const pauseSeconds = 15;

async function checkProviderSlots() {
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
    console.log('Results...');
    results.forEach(({ name, slot }) => console.log(`${name}: ${slot}`));

    const highestSlot = Math.max(...results.map((res) => res.slot));
    const winners = results.filter(({ slot }) => slot === highestSlot);
    console.log('Winner(s)...');
    if (winners.length === 1) {
      console.log(winners[0].name);
    } else {
      winners.forEach(({ name }) => console.log(name));
    }
    console.log('\n');
  } catch (error) {
    // console.error(error);
  } finally {
    setTimeout(checkProviderSlots, pauseSeconds * 1000);
  }
}

checkProviderSlots();
