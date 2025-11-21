// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/TriviaLeaderboard.sol";

contract DeployTriviaLeaderboard is Script {
    // Celo Alfajores Testnet
    address constant CUSD_TOKEN = 0x765DE816845861e75A25fCA122bb6898B8B1282a;
    
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Deploy TriviaLeaderboard
        TriviaLeaderboard trivia = new TriviaLeaderboard(CUSD_TOKEN);

        console.log("===========================================");
        console.log("TriviaLeaderboard deployed!");
        console.log("===========================================");
        console.log("Contract Address:", address(trivia));
        console.log("");
        console.log("Game Parameters:");
        console.log("- Play Fee: 0.1 cUSD");
        console.log("- Questions Per Session: 10");
        console.log("- Time Limit: 5 minutes");
        console.log("- Points Per Correct Answer: 10");
        console.log("- Max Speed Bonus: 5 points");
        console.log("- Leaderboard Size: Top 100");
        console.log("- Reward Distribution: Weekly");
        console.log("===========================================");
        console.log("");
        console.log("Next steps:");
        console.log("1. Add questions (minimum 10)");
        console.log("2. Players register usernames");
        console.log("3. Players start playing!");
        console.log("===========================================");

        vm.stopBroadcast();
    }
}
