# Solana Block Derby 🏇🏻

A script to fetch Solana blockchain's latest slot number using various blockchain node providers, compare them, and compute the winner.

(Optional) The data can also be sent to a Posgtres DB for querying later.

### Current Providers

- Alchemy
- Ankr
- Chainstack
- Pokt Network
- QuickNode

## Screenshot

![sol-block-derby](/assets/sol-block-derby.png)

## Run

Clone the project

```bash
  git clone https://github.com/a26nine/sol-block-derby
```

Go to the project directory

```bash
  cd sol-block-derby
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

## Configuration

- `timeoutSeconds` - Timeout for the RPC request
- `intervalSeconds` - Time interval between the rounds
- `isDb` - Setting to enable/disable the database operations

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file (sample in `.env.example` file)

- `ALCHEMY_ENDPOINT=`
- `ANKR_ENDPOINT=`
- `CHAINSTACK_ENDPOINT=`
- `POKT_ENDPOINT=`
- `QUICKNODE_ENDPOINT=`

_If you want to push the results to a Postgres Database and if `isDb` is set to true_

- `PGDATABASE=`
- `PGHOST=`
- `PGPASSWORD=`
- `PGPORT=`
- `PGUSER=`

## Query Database

You can run `winner.sql` query against the database to populate the winner.
