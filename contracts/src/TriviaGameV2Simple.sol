// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title TriviaGameV2Simple
 * @dev Simplified trivia game with on-chain questions and pseudo-random selection
 * Perfect for MVP - no Chainlink VRF dependency
 */
contract TriviaGameV2Simple is Ownable, ReentrancyGuard {
    IERC20 public cUSDToken;
    
    // Game Constants
    uint256 public constant ENTRY_FEE = 0.1 * 10**18; // 0.1 cUSD
    uint256 public constant WINNER_SHARE = 80; // 80%
    uint256 public constant SECOND_PLACE_SHARE = 15; // 15%
    uint256 public constant THIRD_PLACE_SHARE = 5; // 5%
    uint256 public constant QUESTIONS_PER_GAME = 10;
    uint256 public constant TIME_LIMIT = 300; // 5 minutes (10 questions * 30 seconds each)
    
    enum GameState { WaitingForPlayers, InProgress, Completed }
    
    struct Question {
        string questionText;
        string[4] options;
        uint8 correctAnswer; // 0-3
        string category;
        bool isActive;
    }
    
    struct PlayerSession {
        address player;
        uint256[] questionIds;
        uint8[] answers;
        uint8 score;
        uint256 startTime;
        uint256 endTime;
        bool completed;
    }
    
    struct Game {
        uint256 id;
        GameState state;
        uint256 prizePool;
        uint256 maxPlayers;
        uint256 startTime;
        address[] players;
        mapping(address => bool) hasJoined;
        mapping(address => PlayerSession) sessions;
        address[] completedPlayers;
        bool prizesDistributed;
    }
    
    // Storage
    Question[] public questions;
    mapping(uint256 => Game) public games;
    uint256 public currentGameId;
    
    // Events
    event QuestionAdded(uint256 indexed questionId, string category);
    event GameCreated(uint256 indexed gameId, uint256 maxPlayers);
    event PlayerJoined(uint256 indexed gameId, address indexed player);
    event QuestionsAssigned(uint256 indexed gameId, address indexed player, uint256[] questionIds);
    event AnswersSubmitted(uint256 indexed gameId, address indexed player, uint8 score);
    event GameCompleted(uint256 indexed gameId, address[] winners, uint256[] prizes);
    event PrizeDistributed(uint256 indexed gameId, address indexed winner, uint256 amount);
    
    constructor(address _cUSDTokenAddress) Ownable(msg.sender) {
        require(_cUSDTokenAddress != address(0), "Invalid cUSD address");
        cUSDToken = IERC20(_cUSDTokenAddress);
        
        // Create the first game automatically
        _createNewGame();
    }
    
    /**
     * @dev Add a new question
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
     * @dev Update an existing question (only owner)
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
        require(bytes(_questionText).length > 0, "Question text required");
        
        Question storage q = questions[_questionId];
        q.questionText = _questionText;
        q.options = _options;
        q.correctAnswer = _correctAnswer;
        q.category = _category;
        q.isActive = _isActive;
        
        emit QuestionAdded(_questionId, _category); // Reuse event for updates
    }
    
    /**
     * @dev Batch add questions (more gas efficient, only owner)
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
     * @dev Join the current game
     */
    function joinGame() external nonReentrant {
        Game storage game = games[currentGameId];
        
        require(game.state == GameState.WaitingForPlayers, "Game not accepting players");
        require(!game.hasJoined[msg.sender], "Already joined");
        require(game.players.length < game.maxPlayers, "Game is full");
        require(questions.length >= QUESTIONS_PER_GAME, "Not enough questions");
        
        // Transfer entry fee
        require(
            cUSDToken.transferFrom(msg.sender, address(this), ENTRY_FEE),
            "Token transfer failed"
        );
        
        game.players.push(msg.sender);
        game.hasJoined[msg.sender] = true;
        game.prizePool += ENTRY_FEE;
        
        emit PlayerJoined(currentGameId, msg.sender);
        
        // Assign random questions immediately
        _assignRandomQuestions(currentGameId, msg.sender);
    }
    
    /**
     * @dev Assign random questions to player (pseudo-random)
     */
    function _assignRandomQuestions(uint256 _gameId, address _player) internal {
        Game storage game = games[_gameId];
        PlayerSession storage session = game.sessions[_player];
        
        uint256[] memory selectedQuestions = new uint256[](QUESTIONS_PER_GAME);
        uint256 activeQuestionCount = _getActiveQuestionCount();
        
        require(activeQuestionCount >= QUESTIONS_PER_GAME, "Not enough active questions");
        
        // Generate pseudo-random seed
        bytes32 randomSeed = keccak256(abi.encodePacked(
            block.timestamp,
            block.prevrandao,
            _player,
            game.players.length,
            _gameId
        ));
        
        // Select random questions (with simple duplicate prevention)
        bool[] memory used = new bool[](activeQuestionCount);
        
        for (uint256 i = 0; i < QUESTIONS_PER_GAME; i++) {
            uint256 randomIndex;
            uint256 attempts = 0;
            
            // Try to find unused question (max 10 attempts to prevent infinite loop)
            do {
                randomSeed = keccak256(abi.encodePacked(randomSeed, i, attempts));
                randomIndex = uint256(randomSeed) % activeQuestionCount;
                attempts++;
            } while (used[randomIndex] && attempts < 10);
            
            used[randomIndex] = true;
            uint256 questionId = _getActiveQuestionAtIndex(randomIndex);
            selectedQuestions[i] = questionId;
        }
        
        session.player = _player;
        session.questionIds = selectedQuestions;
        session.startTime = block.timestamp;
        
        emit QuestionsAssigned(_gameId, _player, selectedQuestions);
    }
    
    /**
     * @dev Submit answers
     */
    function submitAnswers(uint8[] calldata _answers) external nonReentrant {
        Game storage game = games[currentGameId];
        PlayerSession storage session = game.sessions[msg.sender];
        
        require(game.hasJoined[msg.sender], "Not in game");
        require(!session.completed, "Already submitted");
        require(_answers.length == QUESTIONS_PER_GAME, "Invalid answer count");
        require(session.questionIds.length == QUESTIONS_PER_GAME, "Questions not assigned");
        require(block.timestamp <= session.startTime + TIME_LIMIT, "Time expired");
        
        // Calculate score
        uint8 score = 0;
        for (uint256 i = 0; i < QUESTIONS_PER_GAME; i++) {
            if (_answers[i] == questions[session.questionIds[i]].correctAnswer) {
                score++;
            }
        }
        
        session.answers = _answers;
        session.score = score;
        session.endTime = block.timestamp;
        session.completed = true;
        
        game.completedPlayers.push(msg.sender);
        
        emit AnswersSubmitted(currentGameId, msg.sender, score);
        
        // Auto-complete if all players finished
        if (game.completedPlayers.length == game.players.length) {
            _completeGame(currentGameId);
        }
    }
    
    /**
     * @dev Force complete game (owner only, for stuck games)
     */
    function forceCompleteGame() external onlyOwner {
        Game storage game = games[currentGameId];
        require(game.state == GameState.WaitingForPlayers || game.state == GameState.InProgress, "Game already completed");
        require(game.completedPlayers.length > 0, "No completed players");
        
        _completeGame(currentGameId);
    }
    
    /**
     * @dev Complete game and distribute prizes
     */
    function _completeGame(uint256 _gameId) internal {
        Game storage game = games[_gameId];
        
        require(!game.prizesDistributed, "Prizes already distributed");
        
        game.state = GameState.Completed;
        game.prizesDistributed = true;
        
        // Get top 3 players
        address[] memory winners = _getTopPlayers(_gameId, 3);
        uint256[] memory prizes = new uint256[](winners.length);
        
        // Distribute prizes
        if (winners.length >= 1 && winners[0] != address(0)) {
            uint256 firstPrize = (game.prizePool * WINNER_SHARE) / 100;
            prizes[0] = firstPrize;
            cUSDToken.transfer(winners[0], firstPrize);
            emit PrizeDistributed(_gameId, winners[0], firstPrize);
        }
        
        if (winners.length >= 2 && winners[1] != address(0)) {
            uint256 secondPrize = (game.prizePool * SECOND_PLACE_SHARE) / 100;
            prizes[1] = secondPrize;
            cUSDToken.transfer(winners[1], secondPrize);
            emit PrizeDistributed(_gameId, winners[1], secondPrize);
        }
        
        if (winners.length >= 3 && winners[2] != address(0)) {
            uint256 thirdPrize = (game.prizePool * THIRD_PLACE_SHARE) / 100;
            prizes[2] = thirdPrize;
            cUSDToken.transfer(winners[2], thirdPrize);
            emit PrizeDistributed(_gameId, winners[2], thirdPrize);
        }
        
        emit GameCompleted(_gameId, winners, prizes);
        
        // Create new game
        _createNewGame();
    }
    
    /**
     * @dev Create new game
     */
    function _createNewGame() internal {
        currentGameId++;
        Game storage game = games[currentGameId];
        game.id = currentGameId;
        game.state = GameState.WaitingForPlayers;
        game.maxPlayers = 10;
        
        emit GameCreated(currentGameId, game.maxPlayers);
    }
    
    /**
     * @dev Get top players sorted by score and time
     */
    function _getTopPlayers(uint256 _gameId, uint256 _count) internal view returns (address[] memory) {
        Game storage game = games[_gameId];
        uint256 playerCount = game.completedPlayers.length;
        
        if (playerCount == 0) return new address[](0);
        
        // Bubble sort (fine for small arrays)
        address[] memory sorted = new address[](playerCount);
        for (uint256 i = 0; i < playerCount; i++) {
            sorted[i] = game.completedPlayers[i];
        }
        
        for (uint256 i = 0; i < playerCount; i++) {
            for (uint256 j = i + 1; j < playerCount; j++) {
                PlayerSession storage sessionI = game.sessions[sorted[i]];
                PlayerSession storage sessionJ = game.sessions[sorted[j]];
                
                if (sessionJ.score > sessionI.score ||
                    (sessionJ.score == sessionI.score && sessionJ.endTime < sessionI.endTime)) {
                    address temp = sorted[i];
                    sorted[i] = sorted[j];
                    sorted[j] = temp;
                }
            }
        }
        
        uint256 resultCount = playerCount < _count ? playerCount : _count;
        address[] memory result = new address[](resultCount);
        for (uint256 i = 0; i < resultCount; i++) {
            result[i] = sorted[i];
        }
        
        return result;
    }
    
    /**
     * @dev Get active question count
     */
    function _getActiveQuestionCount() internal view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 0; i < questions.length; i++) {
            if (questions[i].isActive) count++;
        }
        return count;
    }
    
    /**
     * @dev Get active question at index
     */
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
    
    // View Functions
    
    function getQuestion(uint256 _questionId) external view returns (
        string memory questionText,
        string[4] memory options,
        string memory category
    ) {
        require(_questionId < questions.length, "Invalid question ID");
        Question storage q = questions[_questionId];
        return (q.questionText, q.options, q.category);
    }
    
    function getPlayerQuestions(address _player) external view returns (uint256[] memory) {
        return games[currentGameId].sessions[_player].questionIds;
    }
    
    function getPlayerSession(address _player) external view returns (
        uint256[] memory questionIds,
        uint8[] memory answers,
        uint8 score,
        uint256 startTime,
        uint256 endTime,
        bool completed
    ) {
        PlayerSession storage session = games[currentGameId].sessions[_player];
        return (
            session.questionIds,
            session.answers,
            session.score,
            session.startTime,
            session.endTime,
            session.completed
        );
    }
    
    function getCurrentGameInfo() external view returns (
        uint256 gameId,
        GameState state,
        uint256 prizePool,
        uint256 playerCount,
        uint256 maxPlayers
    ) {
        Game storage game = games[currentGameId];
        return (
            game.id,
            game.state,
            game.prizePool,
            game.players.length,
            game.maxPlayers
        );
    }
    
    function getQuestionCount() external view returns (uint256) {
        return questions.length;
    }
    
    function hasJoinedCurrentGame(address _player) external view returns (bool) {
        return games[currentGameId].hasJoined[_player];
    }
    
    function getGamePlayers(uint256 _gameId) external view returns (address[] memory) {
        return games[_gameId].players;
    }
    
    function getGameCompletedPlayers(uint256 _gameId) external view returns (address[] memory) {
        return games[_gameId].completedPlayers;
    }
}
