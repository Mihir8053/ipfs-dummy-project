## Dummy IPFS project

This project was developed to get a hands-on with the uploading of files to IPFS using Pinata.
This website allows users to store the file on IPFS. This project gurantees the immutability of the files that are uploaded to the IPFS by storing the hash retrieved from the IPFS to the blockchain. Sepolia testnet was used for the storage of IPFS hashes.

## Technologies Used

- **Website**: ReactJS
- **Blockchain Network**: Ethereum
- **Smart Contracts**: Solidity programming language
- **Blockchain Wallet**: MetaMask
- **JavaScript Library**: Web3.js (for communicating with the blockchain)
- **IPFS Service**: Pinata
- **Testing Framework**: Mocha
- **Local Blockchain Network (for testing smart contract)**: ganache-cli
- **Solidity Compiler**: solc

## Getting Started

1. Clone this repository.
2. Install the required packages using `npm install`.
3. Compile the smart contract:
   - `cd ethereum`
   - `node compile.js`
4. Run `npm run dev` to start the development server.
5. Access the application at `http://localhost:3000`.
6. To run the tests on the smart contract, start the ganache CLI by typing `ganache-cli` in the terminal, then run `npm run test`.
