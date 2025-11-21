// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title TriviaLeaderboard
 * @dev Continuous trivia game with leaderboard and username registration
 * Players can play anytime, earn points, and climb the leaderboard
 */
contract TriviaLeaderboard is Ownable, ReentrancyGuard {
    IERC20 public cUSDToken;
    
    // Game Constants
    uint256 public constant PLAY_FEE = 0.1 * 10**18; // 0.1 cUSD per game
    uint256 public constant QUESTIONS_PER_SESSION = 10;
    uint256 public constant TIME_LIMIT = 300; // 5 minutes
    uint256 public constant POINTS_PER_CORRECT_ANSWER = 10;
    uint256 public constant SPEED_BONUS_MAX = 5; // Max 5 bonus points for speed
    
    // Leaderboard & Rewards
    uint256 public constant LEADERBOARD_SIZE = 100; // Top 100 players
    uint256 public rewardPool;
    uint256 public lastRewardDistribution;
    uint256 public constant REWARD_INTERVAL = 7 days; // Weekly rewards
    
    struct Question {
        string questionText;
        string[4] options;
        uint8 correctAnswer; // 0-3
        string category;
        bool isActive;
    }
    
    struct Player {
        string username;
        uint256 totalScore;
        uint256 gamesPlayed;
        uint256 correctAnswers;
        uint256 totalQuestions;
        uint256 bestScore; // Best score in a single session
        uint256 lastPlayedTime;
        bool isRegistered;
    }
    
    struct GameSession {
        address player;
        uint256[] questionIds;
        uint8[] answers;
        uint8 correctCount;
        uint256 score; // Includes speed bonus
        uint256 startTime;
        uint256 endTime;
        bool completed;
    }
    
    // Storage
    Question[] public questions;
    mapping(address => Player) public players;
    mapping(string => address) public usernameToAddress;
    mapping(address => GameSession[]) public playerSessions;
    
    // Leaderboard (sorted by total score)
    address[] public leaderboard;
    
    // Events
    event QuestionAdded(uint256 indexed questionId, string category);
    event PlayerRegistered(address indexed player, string username);
    event UsernameUpdated(address indexed player, string oldUsername, string newUsername);
    event GameStarted(address indexed player, uint256 sessionId, uint256[] questionIds);
    event GameCompleted(address indexed player, uint256 sessionId, uint256 score, uint8 correctCount);
    event LeaderboardUpdated(address indexed player, uint256 newRank, uint256 totalScore);
    event RewardsDistributed(uint256 totalAmount, uint256 timestamp);
    
    constructor(address _cUSDTokenAddress) Ownable(msg.sender) {
        require(_cUSDTokenAddress != address(0), "Invalid cUSD address");
        cUSDToken = IERC20(_cUSDTokenAddress);
        lastRewardDistribution = block.timestamp;
    }
    
    // ============ PLAYER REGISTRATION ============
    
    /**
     * @dev Register a username (required before playing)
     */
    function registerUsername(string memory _username) external {
        require(!players[msg.sender].isRegistered, "Already registered");
        require(bytes(_username).length >= 3 && bytes(_username).length <= 20, "Username must be 3-20 characters");
        require(usernameToAddress[_username] == address(0), "Username already taken");
        require(_isValidUsername(_username), "Invalid username format");
        
        players[msg.sender].username = _username;
        players[msg.sender].isRegistered = true;
        usernameToAddress[_username] = msg.sender;
        
        emit PlayerRegistered(msg.sender, _username);
    }
    
    /**
     * @dev Update username (costs 0.01 cUSD to prevent spam)
     */
    function updateUsername(string memory _newUsername) external nonReentrant {
        require(players[msg.sender].isRegistered, "Not registered");
        require(bytes(_newUsername).length >= 3 && bytes(_newUsername).length <= 20, "Username must be 3-20 characters");
        require(usernameToAddress[_newUsername] == address(0), "Username already taken");
        require(_isValidUsername(_newUsername), "Invalid username format");
        
        // Charge small fee to prevent spam
        require(
            cUSDToken.transferFrom(msg.sender, address(this), 0.01 * 10**18),
            "Fee payment failed"
        );
        
        string memory oldUsername = players[msg.sender].username;
        delete usernameToAddress[oldUsername];
        
        players[msg.sender].username = _newUsername;
        usernameToAddress[_newUsername] = msg.sender;
        
        rewardPool += 0.01 * 10**18; // Add fee to reward pool
        
        emit UsernameUpdated(msg.sender, oldUsername, _newUsername);
    }
    
    /**
     * @dev Validate username format (alphanumeric and underscore only)
     */
    function _isValidUsername(string memory _username) internal pure returns (bool) {
        bytes memory b = bytes(_username);
        for (uint i = 0; i < b.length; i++) {
            bytes1 char = b[i];
            if (!(
                (char >= 0x30 && char <= 0x39) || // 0-9
                (char >= 0x41 && char <= 0x5A) || // A-Z
                (char >= 0x61 && char <= 0x7A) || // a-z
                (char == 0x5F)                     // _
            )) {
                return false;
            }
        }
        return true;
    }
    
    // ============ QUESTION MANAGEMENT ============
    
    /**
     * @dev Add a new question (owner only)
     */
    function addQuestion(
        string memory _questionText,
        string[4] memory _options,
        uint8 _correctAnswer,
        string memory _category
    ) external onlyOwner {
        require(_correctAnswer < 4, "Invalid correct answer");
        require(bytes(_questionText).length > 0, "Question text required");
        
        questions.push(Question({
            questionText: _questionText,
            options: _options,
            correctAnswer: _correctAnswer,
            category: _category,
            isActive: true
        }));
        
        emit QuestionAdded(questions.length - 1, _category);
    }
    
    /**
     * @dev Batch add questions (owner only)
     */
    function addQuestions(
        string[] memory _questionTexts,
        string[4][] memory _options,
        uint8[] memory _correctAnswers,
        string[] memory _categories
    ) external onlyOwner {
        require(_questionTexts.length == _options.length, "Length mismatch");
        require(_questionTexts.length == _correctAnswers.length, "Length mismatch");
        require(_questionTexts.length == _categories.length, "Length mismatch");
        
        for (uint256 i = 0; i < _questionTexts.length; i++) {
            require(_correctAnswers[i] < 4, "Invalid correct answer");
            require(bytes(_questionTexts[i]).length > 0, "Question text required");
            
            questions.push(Question({
                questionText: _questionTexts[i],
                options: _options[i],
                correctAnswer: _correctAnswers[i],
                category: _categories[i],
                isActive: true
            }));
            
            emit QuestionAdded(questions.length - 1, _categories[i]);
        }
    }
    
    /**
     * @dev Update existing question (owner only)
     */
    function updateQuestion(
        uint256 _questionId,
        string memory _questionText,
        string[4] memory _options,
        uint8 _correctAnswer,
        string memory _category,
        bool _isActive
    ) external onlyOwner {
        require(_questionId < questions.length, "Invalid question ID");
        require(_correctAnswer < 4, "Invalid correct answer");
        
        Question storage q = questions[_questionId];
        q.questionText = _questionText;
        q.options = _options;
        q.correctAnswer = _correctAnswer;
        q.category = _category;
        q.isActive = _isActive;
    }
    
    // ============ GAMEPLAY ============
    
    /**
     * @dev Start a new game session
     */
    function startGame() external nonReentrant returns (uint256 sessionId) {
        require(players[msg.sender].isRegistered, "Must register username first");
        require(questions.length >= QUESTIONS_PER_SESSION, "Not enough questions");
        
        // Pay play fee
        require(
            cUSDToken.transferFrom(msg.sender, address(this), PLAY_FEE),
            "Payment failed"
        );
        
        // Add to reward pool (90% of fee, 10% for contract maintenance)
        rewardPool += (PLAY_FEE * 90) / 100;
        
        // Assign random questions
        uint256[] memory selectedQuestions = _assignRandomQuestions();
        
        // Create new session
        sessionId = playerSessions[msg.sender].length;
        playerSessions[msg.sender].push(GameSession({
            player: msg.sender,
            questionIds: selectedQuestions,
            answers: new uint8[](0),
            correctCount: 0,
            score: 0,
            startTime: block.timestamp,
            endTime: 0,
            completed: false
        }));
        
        players[msg.sender].lastPlayedTime = block.timestamp;
        
        emit GameStarted(msg.sender, sessionId, selectedQuestions);
    }
    
    /**
     * @dev Submit answers and complete game
     */
    function submitAnswers(uint256 _sessionId, uint8[] calldata _answers) external nonReentrant {
        require(_sessionId < playerSessions[msg.sender].length, "Invalid session");
        GameSession storage session = playerSessions[msg.sender][_sessionId];
        
        require(!session.completed, "Already completed");
        require(_answers.length == QUESTIONS_PER_SESSION, "Invalid answer count");
        require(block.timestamp <= session.startTime + TIME_LIMIT, "Time expired");
        
        // Calculate score
        uint8 correctCount = 0;
        for (uint256 i = 0; i < QUESTIONS_PER_SESSION; i++) {
            if (_answers[i] == questions[session.questionIds[i]].correctAnswer) {
                correctCount++;
            }
        }
        
        // Calculate time bonus (faster = more bonus)
        uint256 timeTaken = block.timestamp - session.startTime;
        uint256 speedBonus = _calculateSpeedBonus(timeTaken);
        
        // Total score = (correct answers * points) + speed bonus
        uint256 totalScore = (correctCount * POINTS_PER_CORRECT_ANSWER) + speedBonus;
        
        // Update session
        session.answers = _answers;
        session.correctCount = correctCount;
        session.score = totalScore;
        session.endTime = block.timestamp;
        session.completed = true;
        
        // Update player stats
        Player storage player = players[msg.sender];
        player.totalScore += totalScore;
        player.gamesPlayed++;
        player.correctAnswers += correctCount;
        player.totalQuestions += QUESTIONS_PER_SESSION;
        
        if (totalScore > player.bestScore) {
            player.bestScore = totalScore;
        }
        
        // Update leaderboard
        _updateLeaderboard(msg.sender);
        
        emit GameCompleted(msg.sender, _sessionId, totalScore, correctCount);
    }
    
    /**
     * @dev Calculate speed bonus (faster completion = higher bonus)
     */
    function _calculateSpeedBonus(uint256 _timeTaken) internal pure returns (uint256) {
        if (_timeTaken >= TIME_LIMIT) return 0;
        
        // Linear bonus: 5 points for instant, 0 points at time limit
        uint256 timeRemaining = TIME_LIMIT - _timeTaken;
        return (timeRemaining * SPEED_BONUS_MAX) / TIME_LIMIT;
    }
    
    /**
     * @dev Assign random questions
     */
    function _assignRandomQuestions() internal view returns (uint256[] memory) {
        uint256[] memory selectedQuestions = new uint256[](QUESTIONS_PER_SESSION);
        uint256 activeQuestionCount = _getActiveQuestionCount();
        
        require(activeQuestionCount >= QUESTIONS_PER_SESSION, "Not enough active questions");
        
        bytes32 randomSeed = keccak256(abi.encodePacked(
            block.timestamp,
            block.prevrandao,
            msg.sender,
            playerSessions[msg.sender].length
        ));
        
        bool[] memory used = new bool[](activeQuestionCount);
        
        for (uint256 i = 0; i < QUESTIONS_PER_SESSION; i++) {
            uint256 randomIndex;
            uint256 attempts = 0;
            
            do {
                randomSeed = keccak256(abi.encodePacked(randomSeed, i, attempts));
                randomIndex = uint256(randomSeed) % activeQuestionCount;
                attempts++;
            } while (used[randomIndex] && attempts < 20);
            
            used[randomIndex] = true;
            selectedQuestions[i] = _getActiveQuestionAtIndex(randomIndex);
        }
        
        return selectedQuestions;
    }
    
    // ============ LEADERBOARD ============
    
    /**
     * @dev Update leaderboard after game completion
     */
    function _updateLeaderboard(address _player) internal {
        // Remove player from current position if exists
        for (uint256 i = 0; i < leaderboard.length; i++) {
            if (leaderboard[i] == _player) {
                // Shift elements
                for (uint256 j = i; j < leaderboard.length - 1; j++) {
                    leaderboard[j] = leaderboard[j + 1];
                }
                leaderboard.pop();
                break;
            }
        }
        
        // Find correct position and insert
        uint256 playerScore = players[_player].totalScore;
        uint256 insertIndex = leaderboard.length;
        
        for (uint256 i = 0; i < leaderboard.length; i++) {
            if (playerScore > players[leaderboard[i]].totalScore) {
                insertIndex = i;
                break;
            }
        }
        
        // Insert at position
        leaderboard.push(address(0));
        for (uint256 i = leaderboard.length - 1; i > insertIndex; i--) {
            leaderboard[i] = leaderboard[i - 1];
        }
        leaderboard[insertIndex] = _player;
        
        // Keep only top LEADERBOARD_SIZE
        if (leaderboard.length > LEADERBOARD_SIZE) {
            leaderboard.pop();
        }
        
        emit LeaderboardUpdated(_player, insertIndex + 1, playerScore);
    }
    
    /**
     * @dev Distribute weekly rewards to top players (owner only)
     */
    function distributeRewards() external onlyOwner nonReentrant {
        require(block.timestamp >= lastRewardDistribution + REWARD_INTERVAL, "Too early");
        require(rewardPool > 0, "No rewards to distribute");
        require(leaderboard.length > 0, "No players");
        
        uint256 totalRewards = rewardPool;
        
        // Top 10 get rewards
        uint256 rewardCount = leaderboard.length < 10 ? leaderboard.length : 10;
        
        // Reward distribution: 40%, 25%, 15%, 10%, 5%, 2.5%, 1%, 0.5%, 0.5%, 0.5%
        uint256[] memory percentages = new uint256[](10);
        percentages[0] = 40;
        percentages[1] = 25;
        percentages[2] = 15;
        percentages[3] = 10;
        percentages[4] = 5;
        percentages[5] = 25; // 2.5%
        percentages[6] = 10; // 1%
        percentages[7] = 5;  // 0.5%
        percentages[8] = 5;  // 0.5%
        percentages[9] = 5;  // 0.5%
        
        for (uint256 i = 0; i < rewardCount; i++) {
            uint256 reward;
            if (i < 5) {
                reward = (totalRewards * percentages[i]) / 100;
            } else {
                reward = (totalRewards * percentages[i]) / 1000;
            }
            
            cUSDToken.transfer(leaderboard[i], reward);
        }
        
        rewardPool = 0;
        lastRewardDistribution = block.timestamp;
        
        emit RewardsDistributed(totalRewards, block.timestamp);
    }
    
    // ============ VIEW FUNCTIONS ============
    
    function getQuestion(uint256 _questionId) external view returns (
        string memory questionText,
        string[4] memory options,
        string memory category
    ) {
        require(_questionId < questions.length, "Invalid question ID");
        Question storage q = questions[_questionId];
        return (q.questionText, q.options, q.category);
    }
    
    function getPlayerInfo(address _player) external view returns (
        string memory username,
        uint256 totalScore,
        uint256 gamesPlayed,
        uint256 correctAnswers,
        uint256 totalQuestions,
        uint256 bestScore,
        uint256 rank
    ) {
        Player storage p = players[_player];
        uint256 playerRank = _getPlayerRank(_player);
        
        return (
            p.username,
            p.totalScore,
            p.gamesPlayed,
            p.correctAnswers,
            p.totalQuestions,
            p.bestScore,
            playerRank
        );
    }
    
    function getSession(address _player, uint256 _sessionId) external view returns (
        uint256[] memory questionIds,
        uint8[] memory answers,
        uint8 correctCount,
        uint256 score,
        uint256 startTime,
        uint256 endTime,
        bool completed
    ) {
        require(_sessionId < playerSessions[_player].length, "Invalid session");
        GameSession storage session = playerSessions[_player][_sessionId];
        
        return (
            session.questionIds,
            session.answers,
            session.correctCount,
            session.score,
            session.startTime,
            session.endTime,
            session.completed
        );
    }
    
    function getLeaderboard(uint256 _count) external view returns (
        address[] memory addresses,
        string[] memory usernames,
        uint256[] memory scores
    ) {
        uint256 count = _count > leaderboard.length ? leaderboard.length : _count;
        
        addresses = new address[](count);
        usernames = new string[](count);
        scores = new uint256[](count);
        
        for (uint256 i = 0; i < count; i++) {
            addresses[i] = leaderboard[i];
            usernames[i] = players[leaderboard[i]].username;
            scores[i] = players[leaderboard[i]].totalScore;
        }
        
        return (addresses, usernames, scores);
    }
    
    function _getPlayerRank(address _player) internal view returns (uint256) {
        for (uint256 i = 0; i < leaderboard.length; i++) {
            if (leaderboard[i] == _player) {
                return i + 1;
            }
        }
        return 0; // Not on leaderboard
    }
    
    function _getActiveQuestionCount() internal view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 0; i < questions.length; i++) {
            if (questions[i].isActive) count++;
        }
        return count;
    }
    
    function _getActiveQuestionAtIndex(uint256 _index) internal view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 0; i < questions.length; i++) {
            if (questions[i].isActive) {
                if (count == _index) return i;
                count++;
            }
        }
        revert("Index out of bounds");
    }
    
    function getQuestionCount() external view returns (uint256) {
        return questions.length;
    }
    
    function isUsernameAvailable(string memory _username) external view returns (bool) {
        return usernameToAddress[_username] == address(0);
    }
    
    function getPlayerSessionCount(address _player) external view returns (uint256) {
        return playerSessions[_player].length;
    }
}
