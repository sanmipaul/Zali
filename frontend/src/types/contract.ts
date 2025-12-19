export interface PlayerInfo {
  username: string;
  totalScore: bigint;
  gamesPlayed: bigint;
  correctAnswers: bigint;
  totalQuestions: bigint;
  bestScore: bigint;
  lastGameId: bigint;
  rank: bigint;
}

export interface GameSession {
  sessionId: bigint;
  playerAddress: string;
  startTime: bigint;
  endTime: bigint;
  score: bigint;
  correctAnswers: number;
  totalQuestions: number;
  isCompleted: boolean;
  questionIds: bigint[];
}

export interface ContractQuestion {
  id: bigint;
  question: string;
  answers: string[];
  correctAnswerIndex: number;
  category: string;
  difficulty: number;
  createdAt: bigint;
}

export interface LeaderboardEntry {
  address: string;
  username: string;
  totalScore: number;
  rank: number;
  gamesPlayed: number;
  lastGameTime?: bigint;
}

export interface RewardInfo {
  pendingRewards: bigint;
  totalClaimed: bigint;
  nextClaimTime: bigint;
  rewardRate: bigint;
}

export interface ContractBalance {
  balance: bigint;
  formattedBalance: string;
  contractBalance?: bigint;
}

export interface TransactionResult {
  hash: string;
  from: string;
  to?: string;
  blockNumber?: number;
  gasUsed?: bigint;
  status: 'success' | 'pending' | 'failed';
  error?: string;
}

export interface GameConstants {
  QUESTIONS_PER_SESSION: number;
  TIME_LIMIT: number;
  REWARD_PER_CORRECT: number;
  PERFECT_SCORE_BONUS: number;
  MAX_SPEED_BONUS: number;
  MAX_REWARD_PER_GAME: number;
  REGISTRATION_FEE: bigint;
}

export interface AllowanceInfo {
  allowance: bigint;
  approved: boolean;
  requiredAmount: bigint;
}

export interface ContractState {
  totalPlayers: bigint;
  totalGamesPlayed: bigint;
  totalRewardsDistributed: bigint;
  contractBalance: bigint;
  isPaused: boolean;
}
