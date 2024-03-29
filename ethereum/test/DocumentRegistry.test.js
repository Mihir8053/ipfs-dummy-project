const assert = require("assert");
const ganache = require("ganache-cli");
const { Web3, eth } = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

const compiledDocumentRegistry = require("../build/DocumentRegistry.json");

let accounts;
let documentRegistry;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    // Deploy the contract
    documentRegistry = await new web3.eth.Contract(compiledDocumentRegistry.abi)
        .deploy({ data: compiledDocumentRegistry.evm.bytecode.object })
        .send({ from: accounts[0], gas: '1000000', gasPrice: 1000000000 });
});

describe("DocumentRegistry", () => {
    it("deploys a contract", () => {
        assert.ok(documentRegistry.options.address);
    });

    it("sets the hash", async () => {
        const newHash = "yourNewHashValue";
        await documentRegistry.methods.set(newHash).send({ from: accounts[0], gas: '1000000', gasPrice: 1000000000 });

        const hash = await documentRegistry.methods.get().call();
        assert.equal(hash, newHash);
    });
});
