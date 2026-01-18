import { useWatchContractEvent } from 'wagmi';
import { CONTRACTS } from '@/config/contracts';

// Types for contract events
export interface GameStartedEvent {
  player: `0x${string}`;
  sessionId: bigint;
  questionIds: readonly bigint[];
  timestamp: bigint;
}

export interface GameCompletedEvent {
  player: `0x${string}`;
  sessionId: bigint;
  score: bigint;
  totalQuestions: bigint;
  timestamp: bigint;
}

export interface RewardsClaimedEvent {
  player: `0x${string}`;
  amount: bigint;
  timestamp: bigint;
}

export interface PlayerRegisteredEvent {
  player: `0x${string}`;
  username: string;
  timestamp: bigint;
}

/**
 * Hook for game-related contract events
 */
export function useGameEvents() {
  // Game started events
  const gameStartedEvents = useWatchContractEvent({
    address: CONTRACTS.triviaGameV2.address,
    abi: CONTRACTS.triviaGameV2.abi,
    eventName: 'GameStarted',
    onLogs(logs) {
      console.log('Game started events:', logs);
    },
  });

  // Game completed events
  const gameCompletedEvents = useWatchContractEvent({
    address: CONTRACTS.triviaGameV2.address,
    abi: CONTRACTS.triviaGameV2.abi,
    eventName: 'GameCompleted',
    onLogs(logs) {
      console.log('Game completed events:', logs);
    },
  });

  return {
    gameStartedEvents,
    gameCompletedEvents,
  };
}

/**
 * Hook for reward-related contract events
 */
export function useRewardEvents() {
  // Rewards claimed events
  const rewardsClaimedEvents = useWatchContractEvent({
    address: CONTRACTS.triviaGameV2.address,
    abi: CONTRACTS.triviaGameV2.abi,
    eventName: 'RewardsClaimed',
    onLogs(logs) {
      console.log('Rewards claimed events:', logs);
    },
  });

  return {
    rewardsClaimedEvents,
  };
}

/**
 * Hook for player-related contract events
 */
export function usePlayerEvents() {
  // Player registered events
  const playerRegisteredEvents = useWatchContractEvent({
    address: CONTRACTS.triviaGameV2.address,
    abi: CONTRACTS.triviaGameV2.abi,
    eventName: 'PlayerRegistered',
    onLogs(logs) {
      console.log('Player registered events:', logs);
    },
  });

  return {
    playerRegisteredEvents,
  };
}

/**
 * Combined contract events hook
 */
export function useContractEvents() {
  const gameEvents = useGameEvents();
  const rewardEvents = useRewardEvents();
  const playerEvents = usePlayerEvents();

  return {
    ...gameEvents,
    ...rewardEvents,
    ...playerEvents,
  };
}