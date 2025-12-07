// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleTriviaGame is Ownable {
    IERC20 public immutable usdcToken;
    uint256 public questionId;
    
    struct Question {
        string questionText;
        string[] options;
        uint256 correctOption;
        uint256 rewardAmount;
        bool isActive;
    }
    
    mapping(uint256 => Question) public questions;
    mapping(address => uint256) public userScores;
    
    event QuestionAdded(uint256 indexed questionId, string questionText, uint256 reward);
    event AnswerSubmitted(address indexed user, uint256 questionId, bool isCorrect, uint256 reward);
    
    constructor(address _usdcToken) Ownable(msg.sender) {
        require(_usdcToken != address(0), "Invalid token address");
        usdcToken = IERC20(_usdcToken);
    }
    
    function addQuestion(
        string memory _questionText,
        string[] memory _options,
        uint256 _correctOption,
        uint256 _rewardAmount
    ) external onlyOwner {
        require(_options.length > 1, "At least 2 options required");
        require(_correctOption < _options.length, "Invalid correct option");
        
        questionId++;
        questions[questionId] = Question({
            questionText: _questionText,
            options: _options,
            correctOption: _correctOption,
            rewardAmount: _rewardAmount,
            isActive: true
        });
        
        emit QuestionAdded(questionId, _questionText, _rewardAmount);
    }
    
    function submitAnswer(uint256 _questionId, uint256 _selectedOption) external {
        Question storage question = questions[_questionId];
        require(question.isActive, "Question not active");
        require(_selectedOption < question.options.length, "Invalid option");
        
        bool isCorrect = (_selectedOption == question.correctOption);
        
        if (isCorrect) {
            userScores[msg.sender]++;
            if (question.rewardAmount > 0) {
                require(
                    usdcToken.transfer(msg.sender, question.rewardAmount),
                    "Reward transfer failed"
                );
            }
        }
        
        emit AnswerSubmitted(msg.sender, _questionId, isCorrect, isCorrect ? question.rewardAmount : 0);
    }
    
    function withdrawTokens(uint256 _amount) external onlyOwner {
        require(
            usdcToken.transfer(msg.sender, _amount),
            "Withdrawal failed"
        );
    }
    
    function getQuestion(uint256 _questionId) external view returns (
        string memory questionText,
        string[] memory options,
        uint256 correctOption,
        uint256 rewardAmount,
        bool isActive
    ) {
        Question storage q = questions[_questionId];
        return (q.questionText, q.options, q.correctOption, q.rewardAmount, q.isActive);
    }
}
