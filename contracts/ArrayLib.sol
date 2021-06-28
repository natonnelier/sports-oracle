//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

library ArrayLib {

    function prepend(string[] memory _arr, string memory _elem) public returns (string[] memory) {
        // move all elements +1
        string[] memory newArray = new string[](_arr.length + 1);
        newArray[0] = _elem;
        for (uint i = 0; i < _arr.length; i++) {
            newArray[i+1] = _arr[i];
        }

        // set first element with param
        return newArray;
    }
}
