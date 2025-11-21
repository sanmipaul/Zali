// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/TriviaGameV2Simple.sol";

contract DeployTriviaGameV2Simple is Script {
    // Celo Alfajores Testnet
    address constant CUSD_TOKEN = 0x765DE816845861e75A25fCA122bb6898B8B1282a;
    
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Deploy TriviaGameV2Simple
        TriviaGameV2Simple triviaGame = new TriviaGameV2Simple(CUSD_TOKEN);

        console.log("===========================================");
        console.log("TriviaGameV2Simple deployed!");
        console.log("===========================================");
        console.log("Contract Address:", address(triviaGame));
        console.log("Current Game ID:", triviaGame.currentGameId());
        console.log("Entry Fee: 0.1 cUSD");
        console.log("Max Players: 10");
        console.log("Questions Per Game: 5");
        console.log("Time Limit: 2.5 minutes");
        console.log("===========================================");
        console.log("");
        console.log("Next steps:");
        console.log("1. Add questions using AddQuestions script");
        console.log("2. Update frontend with new contract address");
        console.log("3. Test the game flow");
        console.log("===========================================");

        vm.stopBroadcast();
    }
}
