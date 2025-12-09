// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title Faucet
 * @dev A contract that distributes test USDC tokens to users (one-time claim)
 */
contract Faucet is Ownable, ReentrancyGuard {
    // Custom Errors
    error InvalidTokenAddress();
    error AlreadyClaimed();
    error InsufficientContractBalance();
    error TransferFailed();
    error InsufficientBalance();
    IERC20 public usdcToken;
    uint256 public constant CLAIM_AMOUNT = 10 * 10**6; // 10 USDC (6 decimals)
    mapping(address => bool) public hasClaimed;

    event TokensClaimed(address indexed recipient, uint256 amount);
    event TokensWithdrawn(address indexed owner, uint256 amount);

    /**
     * @dev Constructor sets the USDC token address
     * @param _usdcTokenAddress Address of the USDC token contract
     */
    constructor(address _usdcTokenAddress) Ownable(msg.sender) {
        if (_usdcTokenAddress == address(0)) revert InvalidTokenAddress();
        usdcToken = IERC20(_usdcTokenAddress);
    }

    /**
     * @dev Allows users to claim their test USDC tokens (one-time only)
     */
    function claim() external nonReentrant {
        require(!hasClaimed[msg.sender], "Already claimed");
        require(
            usdcToken.balanceOf(address(this)) >= CLAIM_AMOUNT,
            "Insufficient contract balance"
        );

        hasClaimed[msg.sender] = true;
        require(
            usdcToken.transfer(msg.sender, CLAIM_AMOUNT),
            "Transfer failed"
        );

        emit TokensClaimed(msg.sender, CLAIM_AMOUNT);
    }

    /**
     * @dev Allows the owner to withdraw any remaining USDC tokens
     * @param amount Amount of tokens to withdraw
     */
    function withdrawTokens(uint256 amount) external onlyOwner {
        require(
            usdcToken.balanceOf(address(this)) >= amount,
            "Insufficient balance"
        );
        require(usdcToken.transfer(owner(), amount), "Transfer failed");
        emit TokensWithdrawn(owner(), amount);
    }

    /**
     * @dev Returns the contract's USDC balance
     */
    function getContractBalance() external view returns (uint256) {
        return usdcToken.balanceOf(address(this));
    }

    /**
     * @dev Checks if an address has already claimed tokens
     * @param user Address to check
     * @return bool True if the address has claimed tokens, false otherwise
     */
    function hasUserClaimed(address user) external view returns (bool) {
        return hasClaimed[user];
    }
}
