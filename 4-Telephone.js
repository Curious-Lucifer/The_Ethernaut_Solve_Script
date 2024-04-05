const { Web3 } = require('web3');
require('dotenv').config();

const web3 = new Web3(process.env.web3Provider);
const account = web3.eth.accounts.wallet.add(process.env.privateKey);


const contract_abi = require('./abi_json/4-Telephone.json');
const contract_address = '0x1D981e2161c89aBCA0b2A12cE69159d1286683a1';
const contract = new web3.eth.Contract(contract_abi, contract_address);

const solve_contract_abi = require('./TelephoneSolve.json');
const solve_contract_address = '0x7E8287846a7cB1Ed0A0a26163Ec8B12ab5BD3a25';
const solve_contract = new web3.eth.Contract(solve_contract_abi, solve_contract_address);


async function solve() {
  var res;

  res = await contract.methods.owner().call();
  console.log(res);

  res = await solve_contract.methods.solve(contract_address, account[0].address).send({
    from: account[0].address
  })
  console.log(res);

  res = await contract.methods.owner().call();
  console.log(res);
}

solve();