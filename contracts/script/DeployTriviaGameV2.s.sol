// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/TriviaGameV2.sol";

contract DeployTriviaGameV2 is Script {
    // Celo Alfajores Testnet Addresses
    address constant CUSD_TOKEN = 0x765DE816845861e75A25fCA122bb6898B8B1282a;
    
    // Chainlink VRF Coordinator for Celo Alfajores
    // Note: You'll need to get the actual VRF coordinator address for Celo
    // For now, using a placeholder - UPDATE THIS!
    address constant VRF_COORDINATOR = 0x0000000000000000000000000000000000000000; // UPDATE!
    
    // VRF Configuration
    uint64 constant SUBSCRIPTION_ID = 0; // UPDATE with your subscription ID
    bytes32 constant KEY_HASH = 0x0000000000000000000000000000000000000000000000000000000000000000; // UPDATE!
    
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        // Deploy TriviaGameV2
        TriviaGameV2 triviaGame = new TriviaGameV2(
            CUSD_TOKEN,
            VRF_COORDINATOR,
            SUBSCRIPTION_ID,
            KEY_HASH
        );

        console.log("===========================================");
        console.log("TriviaGameV2 (Leaderboard) deployed!");
        console.log("===========================================");
        console.log("Contract Address:", address(triviaGame));
        console.log("");
        console.log("Game Parameters:");
        console.log("- Play Fee: 0.1 cUSD");
        console.log("- Questions Per Session: 10");
        console.log("- Time Limit: 5 minutes");
        console.log("- Points Per Correct: 10");
        console.log("- Max Speed Bonus: 5 points");
        console.log("- Leaderboard Size: Top 100");
        console.log("- Reward Distribution: Weekly");
        console.log("===========================================");
        console.log("");
        console.log("Next steps:");
        console.log("1. Add contract to VRF subscription");
        console.log("2. Add questions (minimum 10)");
        console.log("3. Players register usernames");
        console.log("4. Players start playing!");
        console.log("===========================================");

        vm.stopBroadcast();
    }
}
