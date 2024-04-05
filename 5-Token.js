const { Web3 } = require('web3');
require('dotenv').config();

const web3 = new Web3(process.env.web3Provider);
const account = web3.eth.accounts.wallet.add(process.env.privateKey);


const contract_abi = require('./abi_json/5-Token.json');
const contract_address = '0x57dACC1B723b305a4ccB20e11728e8Ed38340ca1';
const contract = new web3.eth.Contract(contract_abi, contract_address);


async function solve() {
  var res;

  res = await contract.methods.balanceOf(account[0].address).call();
  console.log(res);

  res = await contract.methods.transfer(contract_address, 30).send({from: account[0].address});
  console.log(res);

  res = await contract.methods.balanceOf(account[0].address).call();
  console.log(res);
}

solve();