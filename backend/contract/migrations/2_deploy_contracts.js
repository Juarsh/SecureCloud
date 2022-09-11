const InUse = artifacts.require("./InUse.sol");
const Services = artifacts.require("./services.sol");

module.exports = function(deployer) {
  deployer.deploy(Services);
  deployer.deploy(InUse);
};