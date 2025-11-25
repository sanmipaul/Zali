// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";

interface IMockVRF {
    function fulfillAllPending() external;
    function getPendingRequestCount() external view returns (uint256);
}

contract FulfillVRF is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address mockVRFAddress = 0x20E8706C5B1e15329Eb7690d79a5E5668DD5525C;
        
        vm.startBroadcast(deployerPrivateKey);
        
        IMockVRF mockVRF = IMockVRF(mockVRFAddress);
        
        uint256 pendingCount = mockVRF.getPendingRequestCount();
        console.log("Pending VRF requests:", pendingCount);
        
        if (pendingCount > 0) {
            mockVRF.fulfillAllPending();
            console.log("Fulfilled all pending VRF requests!");
        } else {
            console.log("No pending VRF requests to fulfill");
        }
        
        vm.stopBroadcast();
    }
}