const path = require("path");
const solc = require("solc");
const fs = require("fs-extra")

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);//delete the build folder to remove earlier instances of contract
const registryPath = path.resolve(__dirname, "contracts", "DocumentRegistry.sol");

const source = fs.readFileSync(registryPath, "utf-8");

var input = {
    language: 'Solidity',
    sources: {
        'DocumentRegistry.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        },
        evmVersion: "london"
    }
};
// console.log(JSON.parse(solc.compile(JSON.stringify(input))));
const output = JSON.parse(solc.compile(JSON.stringify(input)));//compile the new contracts
fs.ensureDirSync(buildPath);//remake the build folder

for (let contractName in output.contracts['DocumentRegistry.sol']) {
    const contract = output.contracts['DocumentRegistry.sol'][contractName];
    fs.outputJSONSync(
        path.resolve(buildPath, contractName.replace(':', '') + ".json"),
        contract
    );
}