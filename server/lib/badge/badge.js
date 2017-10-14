const ba = require('blockapps-rest');
const rest = ba.rest;
const util = ba.common.util;
const config = ba.common.config;

const contractName = 'Badge';
const contractFilename = `${config.libPath}/badge/contracts/Badge.sol`;

const ErrorCodes = rest.getEnums(`${config.libPath}/common/ErrorCodes.sol`).ErrorCodes;

function* uploadContract(admin, args) {
  const contract = yield rest.uploadContract(admin, contractName, contractFilename, args);
  yield compileSearch();
  contract.src = 'removed';
  return setContract(admin, contract);
}

function setContract(admin, contract) {
  contract.getState = function* () {
    return yield rest.getState(contract);
  }
  return contract;
}

function* compileSearch() {
  rest.verbose('compileSearch', contractName);
  if (yield rest.isCompiled(contractName)) {
    return;
  }
  const searchable = [contractName];
  yield rest.compileSearch(searchable, contractName, contractFilename);
}

module.exports = {
  compileSearch: compileSearch,
  uploadContract: uploadContract,
  // constants
  contractName: contractName,
};
