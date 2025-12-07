// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {TriviaGame} from "../src/TriviaGame.sol";

contract DeployBaseMainnetSimple is Script {
    // Base Mainnet USDC
    address constant USDC_TOKEN = 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913;
    
    function run() external {
        // Load private key from environment variable
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);
        
        // Deploy TriviaGame with USDC token address
        TriviaGame triviaGame = new TriviaGame(USDC_TOKEN);
        
        console.log("TriviaGame deployed to:", address(triviaGame));
        
        vm.stopBroadcast();
    }
}
