// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DocumentRegistry {
    string public hash;

    //read function
    function get() public view returns (string memory) {
        return hash;
    }

    //write function
    function set(string memory _hash) public {
        hash = _hash;
    }
}
