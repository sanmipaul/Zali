// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {TriviaGameV2} from "../src/TriviaGameV2.sol";

contract DeployBaseMainnet is Script {
    // Base Mainnet VRF Coordinator
    address constant VRF_COORDINATOR = 0x41034678D6C633D8a95c75e1138A360a28bA15d1;
    // Base Mainnet USDC
    address constant USDC_TOKEN = 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913;
    // Key Hash for Base Mainnet
    bytes32 constant KEY_HASH = 0x8af398995b04c28e9951adb9721ef74c74f93e6a478f39e7e0777be13527e7ef;
    // Subscription ID - you'll need to create this in the Chainlink VRF UI
    uint64 constant SUBSCRIPTION_ID = 0; // Replace with your subscription ID
    
    function run() external {
        // Load private key from environment variable
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);
        
        // Deploy TriviaGameV2 with 0.1 ETH for initial funding
        TriviaGameV2 triviaGame = new TriviaGameV2{value: 0.1 ether}(
            VRF_COORDINATOR,
            SUBSCRIPTION_ID,
            KEY_HASH
        );
        
        console.log("TriviaGameV2 deployed to:", address(triviaGame));
        console.log("Contract funded with 0.1 ETH for rewards");
        
        vm.stopBroadcast();
    }
}
