import web3 from "./web3";
import DocumentRegistry from "../ethereum/build/DocumentRegistry.json"

const instance = new web3.eth.Contract(
    DocumentRegistry.abi, "0x5bed97b4839858b94f49c23b4b2d8361c3d6a570"
);

export default instance;
