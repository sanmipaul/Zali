// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title MockVRFCoordinator
 * @dev Mock VRF Coordinator for Celo until Chainlink VRF is available
 * This provides pseudo-random numbers using block data
 * Can be replaced with real Chainlink VRF when available on Celo
 */
contract MockVRFCoordinator {
    uint256 private nonce;
    
    event RandomWordsRequested(
        bytes32 indexed keyHash,
        uint256 requestId,
        uint256 preSeed,
        uint64 indexed subId,
        uint16 minimumRequestConfirmations,
        uint32 callbackGasLimit,
        uint32 numWords,
        address indexed sender
    );
    
    event RandomWordsFulfilled(
        uint256 indexed requestId,
        uint256 outputSeed,
        uint96 payment,
        bool success
    );
    
    /**
     * @dev Request random words (mock implementation)
     */
    function requestRandomWords(
        bytes32 keyHash,
        uint64 subId,
        uint16 minimumRequestConfirmations,
        uint32 callbackGasLimit,
        uint32 numWords
    ) external returns (uint256 requestId) {
        requestId = uint256(keccak256(abi.encodePacked(
            block.timestamp,
            block.prevrandao,
            msg.sender,
            nonce++
        )));
        
        emit RandomWordsRequested(
            keyHash,
            requestId,
            0,
            subId,
            minimumRequestConfirmations,
            callbackGasLimit,
            numWords,
            msg.sender
        );
        
        // Generate pseudo-random words
        uint256[] memory randomWords = new uint256[](numWords);
        for (uint256 i = 0; i < numWords; i++) {
            randomWords[i] = uint256(keccak256(abi.encodePacked(
                requestId,
                i,
                block.timestamp,
                block.prevrandao,
                blockhash(block.number - 1)
            )));
        }
        
        // Immediately fulfill the request (in real VRF this would be async)
        IVRFConsumer(msg.sender).rawFulfillRandomWords(requestId, randomWords);
        
        emit RandomWordsFulfilled(requestId, 0, 0, true);
        
        return requestId;
    }
}

/**
 * @dev Interface for VRF consumer
 */
interface IVRFConsumer {
    function rawFulfillRandomWords(uint256 requestId, uint256[] memory randomWords) external;
}
