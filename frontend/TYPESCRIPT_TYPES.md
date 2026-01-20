# TypeScript Types Documentation

This document describes the comprehensive TypeScript types used throughout the application for API responses, contracts, users, and more.

## Table of Contents

1. [Overview](#overview)
2. [API Types](#api-types)
3. [Contract Types](#contract-types)
4. [User Types](#user-types)
5. [Reward Types](#reward-types)
6. [Error Types](#error-types)
7. [Hook Types](#hook-types)
8. [Validation Types](#validation-types)
9. [Usage Examples](#usage-examples)

## Overview

All type definitions are located in `src/types/` directory:

- `api.ts` - API request/response types
- `contract.ts` - Smart contract entity types
- `user.ts` - User and profile types
- `reward.ts` - Reward and earning types
- `errors.ts` - Error handling and error codes
- `hooks.ts` - Custom hook return types
- `validation.ts` - Validation rule types
- `index.ts` - Centralized exports

## API Types

### ApiSuccessResponse

Generic success response type for all successful API calls.

```typescript
interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  requestId?: string;
  timestamp?: string;
}
```

**Usage:**

```typescript
const response: ApiSuccessResponse<User> = {
  success: true,
  data: { address: '0x...', username: 'john' },
  requestId: 'req-123',
};
```

### ApiErrorResponse

Error response type for failed API calls.

```typescript
interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  requestId?: string;
  timestamp?: string;
}
```

### ApiResponse<T>

Union type that represents either success or error response.

```typescript
type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
```

### PaginatedResponse<T>

Type for paginated data responses.

```typescript
interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
```

## Contract Types

### PlayerInfo

Player information from smart contract.

```typescript
interface PlayerInfo {
  username: string;
  totalScore: bigint;
  gamesPlayed: bigint;
  correctAnswers: bigint;
  totalQuestions: bigint;
  bestScore: bigint;
  lastGameId: bigint;
  rank: bigint;
}
```

### GameSession

Represents an active or completed game session.

```typescript
interface GameSession {
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
```

### LeaderboardEntry

A single entry in the leaderboard.

```typescript
interface LeaderboardEntry {
  address: string;
  username: string;
  totalScore: number;
  rank: number;
  gamesPlayed: number;
  lastGameTime?: bigint;
}
```

### RewardInfo

Player's reward information from contract.

```typescript
interface RewardInfo {
  pendingRewards: bigint;
  totalClaimed: bigint;
  nextClaimTime: bigint;
  rewardRate: bigint;
}
```

### ContractBalance

Balance information.

```typescript
interface ContractBalance {
  balance: bigint;
  formattedBalance: string;
  contractBalance?: bigint;
}
```

### AllowanceInfo

Token allowance information.

```typescript
interface AllowanceInfo {
  allowance: bigint;
  approved: boolean;
  requiredAmount: bigint;
}
```

## User Types

### User

Basic user information.

```typescript
interface User {
  address: string;
  username: string;
  email?: string;
  profileImage?: string;
  bio?: string;
  joinedAt: string;
  lastActivity: string;
  isActive: boolean;
}
```

### UserProfile

Extended user profile with statistics.

```typescript
interface UserProfile extends User {
  totalScore: number;
  gamesPlayed: number;
  wins: number;
  winRate: number;
  averageScore: number;
  bestScore: number;
  rank: number;
  badges: UserBadge[];
  achievements: Achievement[];
}
```

### UserStatistics

Detailed user statistics.

```typescript
interface UserStatistics {
  address: string;
  totalScore: number;
  gamesPlayed: number;
  correctAnswers: number;
  totalQuestions: number;
  accuracy: number;
  bestScore: number;
  averageScore: number;
  rank: number;
  level: number;
  experiencePoints: number;
  streakDays: number;
  lastGameDate: string;
}
```

### UserBadge

User achievement badge.

```typescript
interface UserBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}
```

## Reward Types

### Reward

Available reward item.

```typescript
interface Reward {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
  icon: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  value: number;
  claimable: boolean;
}
```

### GameReward

Reward earned from a game.

```typescript
interface GameReward {
  id: string;
  gameId: string;
  correctAnswers: number;
  baseReward: number;
  speedBonus: number;
  perfectScoreBonus: number;
  totalReward: number;
  timestamp: string;
}
```

### RewardBalance

Current reward balance.

```typescript
interface RewardBalance {
  totalEarned: number;
  totalClaimed: number;
  pendingRewards: number;
  availableToClaim: number;
}
```

## Error Types

### ErrorCode

Enumeration of all possible error codes.

```typescript
enum ErrorCode {
  // Client errors
  INVALID_REQUEST = 'INVALID_REQUEST',
  AUTHENTICATION_REQUIRED = 'AUTHENTICATION_REQUIRED',
  
  // Contract errors
  INSUFFICIENT_BALANCE = 'INSUFFICIENT_BALANCE',
  INSUFFICIENT_ALLOWANCE = 'INSUFFICIENT_ALLOWANCE',
  
  // Game errors
  GAME_NOT_FOUND = 'GAME_NOT_FOUND',
  NOT_ENOUGH_QUESTIONS = 'NOT_ENOUGH_QUESTIONS',
  
  // Wallet errors
  WALLET_NOT_CONNECTED = 'WALLET_NOT_CONNECTED',
  // ... more error codes
}
```

### ApiException

Custom error class extending Error.

```typescript
class ApiException extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly details?: Record<string, any>;

  constructor(
    code: string,
    message: string,
    statusCode?: number,
    details?: Record<string, any>
  ) { }

  toJSON(): ErrorDetails { }
}
```

**Usage:**

```typescript
throw new ApiException(
  ErrorCode.INSUFFICIENT_BALANCE,
  'Not enough tokens',
  402,
  { required: 100, available: 50 }
);
```

### ERROR_MESSAGES

Map of error codes to user-friendly messages.

```typescript
const ERROR_MESSAGES: Record<string, string> = {
  [ErrorCode.INVALID_REQUEST]: 'Invalid request. Please check your input.',
  [ErrorCode.INSUFFICIENT_BALANCE]: 'Insufficient balance for this transaction.',
  // ... more messages
};
```

## Hook Types

### UsePlayerRegistrationReturn

Return type for `usePlayerRegistration` hook.

```typescript
interface UsePlayerRegistrationReturn {
  playerInfo: PlayerInfo | null;
  isRegistered: boolean;
  isFetching: boolean;
  error: Error | null;
  registerUsername: (username: string) => Promise<void>;
  updateUsername: (username: string) => Promise<void>;
  // ... more fields
}
```

### UseGameSessionReturn

Return type for `useGameSession` hook.

```typescript
interface UseGameSessionReturn {
  sessionId: bigint | null;
  gameSession: GameSession | null;
  isLoading: boolean;
  startGame: () => Promise<void>;
  endGame: (score: number) => Promise<void>;
  // ... more fields
}
```

## Validation Types

### ValidationRule

A single validation rule.

```typescript
interface ValidationRule {
  validate: (value: any) => boolean | Promise<boolean>;
  message: string;
}
```

### ValidateResult

Result of validation.

```typescript
interface ValidateResult {
  isValid: boolean;
  errors: Record<string, string[]>;
}
```

## Usage Examples

### Working with API Responses

```typescript
import { ApiResponse, User } from '@/types';

async function fetchUser(address: string): Promise<User | null> {
  const response: ApiResponse<User> = await fetch(`/api/users/${address}`).then(r => r.json());

  if (response.success) {
    return response.data;
  } else {
    console.error(response.error.message);
    return null;
  }
}
```

### Working with Errors

```typescript
import { ApiException, ErrorCode, ERROR_MESSAGES } from '@/types';

try {
  // Some operation
} catch (error) {
  if (error instanceof ApiException) {
    const message = ERROR_MESSAGES[error.code] || error.message;
    toast.error(message);
  }
}
```

### Working with Contract Data

```typescript
import { PlayerInfo, GameSession } from '@/types';

function displayPlayerStats(info: PlayerInfo) {
  return {
    score: info.totalScore.toString(),
    games: info.gamesPlayed.toString(),
    rank: `#${info.rank}`,
  };
}
```

### Working with Forms

```typescript
import { ValidationRule, ValidateResult } from '@/types';

const usernameRules: ValidationRule[] = [
  {
    validate: (v) => v.length >= 3,
    message: 'Username must be at least 3 characters',
  },
  {
    validate: (v) => /^[a-zA-Z0-9_]+$/.test(v),
    message: 'Username can only contain letters, numbers, and underscores',
  },
];
```

## Best Practices

1. **Always use types from `src/types`**: Import from the centralized types directory
2. **Use strict typing**: Avoid `any` type, use specific types instead
3. **Validate API responses**: Check the success flag before using data
4. **Handle errors properly**: Use ErrorCode enum and ERROR_MESSAGES for user feedback
5. **Keep types updated**: Update type definitions when API contracts change
6. **Test types**: Ensure types accurately reflect data structures

## Migrating Existing Code

To add types to existing code:

1. Import type from `src/types`
2. Add type annotations to function parameters and returns
3. Update response handling to check `success` flag
4. Replace generic errors with `ApiException`
5. Use `ErrorCode` enum instead of string literals
6. Run TypeScript compiler to catch type errors

## Adding New Types

When adding new types:

1. Create file in appropriate module (e.g., `notification.ts`)
2. Export types from `src/types/index.ts`
3. Add unit tests in `src/types/__tests__/`
4. Update this documentation

## Additional Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Type Safety Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Advanced Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html)
