const { Web3 } = require('web3');
require('dotenv').config();

const web3 = new Web3(process.env.web3Provider);
const account = web3.eth.accounts.wallet.add(process.env.privateKey);


const contract_abi = require('./abi_json/0-Hello_Ethernaut.json');
const contract_address = '0xb4D0d5F9e5E0eB4d1fab0B7C17731a6184b71a8A';
const contract = new web3.eth.Contract(contract_abi, contract_address);


async function solve() {
  var res;

  res = await contract.methods.info().call();
  console.log(res);

  res = await contract.methods.info1().call();
  console.log(res);

  res = await contract.methods.info2('hello').call();
  console.log(res);

  res = await contract.methods.infoNum().call();
  console.log(res);

  res = await contract.methods.info42().call();
  console.log(res);

  res = await contract.methods.theMethodName().call();
  console.log(res);

  res = await contract.methods.method7123949().call();
  console.log(res);

  password = await contract.methods.password().call();
  console.log(password);

  res = await contract.methods.authenticate(password).send({from: account[0].address});
  console.log(res);

  res = await web3.eth.getStorageAt(contract_address, 3);
  console.log(res);
}

solve();
