// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/MockVRFCoordinatorV3.sol";
import "../src/TriviaGameV2.sol";

contract DeployWithMockVRFV3 is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);
        
        // Deploy MockVRFCoordinatorV3
        MockVRFCoordinatorV3 mockVRF = new MockVRFCoordinatorV3();
        console.log("MockVRFCoordinatorV3 deployed at:", address(mockVRF));
        
        // Deploy TriviaGameV2 with MockVRF
        TriviaGameV2 triviaGame = new TriviaGameV2{value: 1 ether}(
            address(mockVRF),  // VRF coordinator
            1,                 // subscription ID (dummy)
            0x0000000000000000000000000000000000000000000000000000000000000001 // key hash (dummy)
        );
        console.log("TriviaGameV2 deployed at:", address(triviaGame));
        
        vm.stopBroadcast();
        
        // Log deployment info
        console.log("\n=== DEPLOYMENT COMPLETE ===");
        console.log("MockVRFCoordinatorV3:", address(mockVRF));
        console.log("TriviaGameV2:", address(triviaGame));
        console.log("Initial funding: 1 CELO");
        console.log("\nNext steps:");
        console.log("1. Update .env.local with new addresses");
        console.log("2. Add questions to the contract");
        console.log("3. Test the game!");
    }
}