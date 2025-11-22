// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/MockVRFCoordinatorV3.sol";

contract FulfillVRFRequests is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address mockVRFAddress = vm.envAddress("NEXT_PUBLIC_MOCK_VRF_ADDRESS");
        
        vm.startBroadcast(deployerPrivateKey);
        
        MockVRFCoordinatorV3 mockVRF = MockVRFCoordinatorV3(mockVRFAddress);
        
        // Get pending requests
        uint256 pendingCount = mockVRF.getPendingRequestCount();
        console.log("Pending VRF requests:", pendingCount);
        
        if (pendingCount > 0) {
            // Fulfill all pending requests
            mockVRF.fulfillAllPending();
            console.log("Fulfilled all pending VRF requests");
        } else {
            console.log("No pending requests to fulfill");
        }
        
        vm.stopBroadcast();
    }
}