require('dotenv').config();

const web3 = require('@solana/web3.js');

const alchemyEndpoint = process.env.ALCHEMY_ENDPOINT;
const ankrEndpoint = process.env.ANKR_ENDPOINT;
const chainstackEndpoint = process.env.CHAINSTACK_ENDPOINT;
const poktEndpoint = process.env.POKT_ENDPOINT;
const quicknodeEndpoint = process.env.QUICKNODE_ENDPOINT;

const providers = {
  Alchemy: alchemyEndpoint,
  Ankr: ankrEndpoint,
  Chainstack: chainstackEndpoint,
  Pokt: poktEndpoint,
  QuickNode: quicknodeEndpoint,
};

Object.keys(providers).forEach((provider) => {
  (async () => {
    const solana = new web3.Connection(providers[provider]);
    console.log(provider, await solana.getSlot());
  })();
});
