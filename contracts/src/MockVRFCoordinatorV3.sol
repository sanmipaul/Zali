// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title MockVRFCoordinatorV3
 * @dev Fixed Mock VRF Coordinator that doesn't auto-fulfill in same transaction
 * This version stores requests and requires manual fulfillment to avoid callback timing issues
 */
contract MockVRFCoordinatorV3 {
    uint256 private nonce;
    
    struct Request {
        address requester;
        uint32 numWords;
        bool fulfilled;
        uint256[] randomWords;
    }
    
    mapping(uint256 => Request) public requests;
    uint256[] public pendingRequests;
    
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
     * @dev Request random words (stores request, generates random words, but doesn't fulfill yet)
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
        
        // Generate pseudo-random words immediately
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
        
        requests[requestId] = Request({
            requester: msg.sender,
            numWords: numWords,
            fulfilled: false,
            randomWords: randomWords
        });
        
        pendingRequests.push(requestId);
        
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
        
        return requestId;
    }
    
    /**
     * @dev Fulfill a specific request (can be called by anyone)
     */
    function fulfillRequest(uint256 requestId) external {
        Request storage request = requests[requestId];
        require(request.requester != address(0), "Request not found");
        require(!request.fulfilled, "Already fulfilled");
        
        request.fulfilled = true;
        
        // Remove from pending requests
        for (uint256 i = 0; i < pendingRequests.length; i++) {
            if (pendingRequests[i] == requestId) {
                pendingRequests[i] = pendingRequests[pendingRequests.length - 1];
                pendingRequests.pop();
                break;
            }
        }
        
        // Call the consumer's callback
        try IVRFConsumer(request.requester).rawFulfillRandomWords(requestId, request.randomWords) {
            emit RandomWordsFulfilled(requestId, 0, 0, true);
        } catch Error(string memory reason) {
            emit RandomWordsFulfilled(requestId, 0, 0, false);
            revert(string(abi.encodePacked("Callback failed: ", reason)));
        } catch {
            emit RandomWordsFulfilled(requestId, 0, 0, false);
            revert("Callback failed: Unknown error");
        }
    }
    
    /**
     * @dev Fulfill all pending requests (batch operation)
     */
    function fulfillAllPending() external {
        uint256[] memory toFulfill = new uint256[](pendingRequests.length);
        for (uint256 i = 0; i < pendingRequests.length; i++) {
            toFulfill[i] = pendingRequests[i];
        }
        
        for (uint256 i = 0; i < toFulfill.length; i++) {
            if (!requests[toFulfill[i]].fulfilled) {
                try this.fulfillRequest(toFulfill[i]) {
                    // Success
                } catch {
                    // Continue with next request if one fails
                }
            }
        }
    }
    
    /**
     * @dev Get pending request count
     */
    function getPendingRequestCount() external view returns (uint256) {
        return pendingRequests.length;
    }
    
    /**
     * @dev Get all pending requests
     */
    function getPendingRequests() external view returns (uint256[] memory) {
        return pendingRequests;
    }
    
    /**
     * @dev Get request details
     */
    function getRequest(uint256 requestId) external view returns (
        address requester,
        uint32 numWords,
        bool fulfilled,
        uint256[] memory randomWords
    ) {
        Request storage request = requests[requestId];
        return (request.requester, request.numWords, request.fulfilled, request.randomWords);
    }
}

/**
 * @dev Interface for VRF consumer
 */
interface IVRFConsumer {
    function rawFulfillRandomWords(uint256 requestId, uint256[] memory randomWords) external;
}