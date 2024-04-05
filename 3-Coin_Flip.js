const { Web3 } = require('web3');
require('dotenv').config();

const web3 = new Web3(process.env.web3Provider);
const account = web3.eth.accounts.wallet.add(process.env.privateKey);


const contract_abi = require('./abi_json/3-Coin_Flip.json');
const contract_address = '0xbeA8B35c79d50A2fb3B3a2ecF2f21F06CB027cA6';
const contract = new web3.eth.Contract(contract_abi, contract_address);


async function solve() {
  const FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968n;
  var res;

  res = await contract.methods.consecutiveWins().call();
  console.log(res);

  var prevBlockNum = (await web3.eth.getBlockNumber());
  var prevBlockHash = (await web3.eth.getBlock(prevBlockNum)).hash;
  var prevBlockHashBN = web3.utils.toNumber(prevBlockHash);
  var guess = web3.utils.toBool(prevBlockHashBN / FACTOR);
  console.log(guess);

  res = await contract.methods.flip(guess).send({from: account[0].address});
  console.log(res);

  res = await contract.methods.consecutiveWins().call();
  console.log(res);
}

solve();