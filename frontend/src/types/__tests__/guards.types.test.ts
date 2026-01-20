import {
  isApiSuccessResponse,
  isApiErrorResponse,
  isPlayerInfo,
  isGameSession,
  isLeaderboardEntry,
  isUser,
  isUserProfile,
  isValidAddress,
  isValidUsername,
  isValidEmail,
} from '../guards';
import { ApiResponse } from '../api';
import { PlayerInfo } from '../contract';

describe('Type Guards', () => {
  describe('isApiSuccessResponse', () => {
    it('should return true for success responses', () => {
      const response: ApiResponse<string> = {
        success: true,
        data: 'test',
      };

      expect(isApiSuccessResponse(response)).toBe(true);
    });

    it('should return false for error responses', () => {
      const response: ApiResponse<string> = {
        success: false,
        error: { code: 'ERROR', message: 'Error' },
      };

      expect(isApiSuccessResponse(response)).toBe(false);
    });
  });

  describe('isApiErrorResponse', () => {
    it('should return true for error responses', () => {
      const response: ApiResponse<string> = {
        success: false,
        error: { code: 'ERROR', message: 'Error' },
      };

      expect(isApiErrorResponse(response)).toBe(true);
    });

    it('should return false for success responses', () => {
      const response: ApiResponse<string> = {
        success: true,
        data: 'test',
      };

      expect(isApiErrorResponse(response)).toBe(false);
    });
  });

  describe('isPlayerInfo', () => {
    it('should return true for valid PlayerInfo', () => {
      const playerInfo: PlayerInfo = {
        username: 'testuser',
        totalScore: 1000n,
        gamesPlayed: 5n,
        correctAnswers: 40n,
        totalQuestions: 50n,
        bestScore: 250n,
        lastGameId: 5n,
        rank: 10n,
      };

      expect(isPlayerInfo(playerInfo)).toBe(true);
    });

    it('should return false for invalid PlayerInfo', () => {
      expect(isPlayerInfo({ username: 'test' })).toBe(false);
      expect(isPlayerInfo(null)).toBe(false);
      expect(isPlayerInfo(undefined)).toBe(false);
    });
  });

  describe('isGameSession', () => {
    it('should return true for valid GameSession', () => {
      const session = {
        sessionId: 1n,
        playerAddress: '0x1234567890123456789012345678901234567890',
        startTime: 1000000n,
        endTime: 1005000n,
        score: 100n,
        correctAnswers: 8,
        totalQuestions: 10,
        isCompleted: true,
        questionIds: [1n, 2n],
      };

      expect(isGameSession(session)).toBe(true);
    });

    it('should return false for invalid GameSession', () => {
      expect(isGameSession({ sessionId: 1n })).toBe(false);
      expect(isGameSession(null)).toBe(false);
    });
  });

  describe('isLeaderboardEntry', () => {
    it('should return true for valid LeaderboardEntry', () => {
      const entry = {
        address: '0x1234567890123456789012345678901234567890',
        username: 'topplayer',
        totalScore: 5000,
        rank: 1,
        gamesPlayed: 50,
      };

      expect(isLeaderboardEntry(entry)).toBe(true);
    });

    it('should return false for invalid LeaderboardEntry', () => {
      expect(isLeaderboardEntry({ rank: 1 })).toBe(false);
      expect(isLeaderboardEntry(null)).toBe(false);
    });
  });

  describe('isUser', () => {
    it('should return true for valid User', () => {
      const user = {
        address: '0x1234567890123456789012345678901234567890',
        username: 'john',
        joinedAt: '2024-01-01',
        lastActivity: '2024-01-02',
        isActive: true,
      };

      expect(isUser(user)).toBe(true);
    });

    it('should return false for invalid User', () => {
      expect(isUser({ username: 'john' })).toBe(false);
      expect(isUser(null)).toBe(false);
    });
  });

  describe('isValidAddress', () => {
    it('should return true for valid addresses', () => {
      expect(isValidAddress('0x1234567890123456789012345678901234567890')).toBe(
        true
      );
      expect(isValidAddress('0xABCDEF1234567890ABCDEF1234567890ABCDEF12')).toBe(
        true
      );
    });

    it('should return false for invalid addresses', () => {
      expect(isValidAddress('0x123')).toBe(false);
      expect(isValidAddress('123456789012345678901234567890123456789')).toBe(false);
      expect(isValidAddress('not-an-address')).toBe(false);
      expect(isValidAddress(null)).toBe(false);
      expect(isValidAddress(123)).toBe(false);
    });
  });

  describe('isValidUsername', () => {
    it('should return true for valid usernames', () => {
      expect(isValidUsername('john')).toBe(true);
      expect(isValidUsername('john_doe')).toBe(true);
      expect(isValidUsername('user123')).toBe(true);
      expect(isValidUsername('abc')).toBe(true);
    });

    it('should return false for invalid usernames', () => {
      expect(isValidUsername('ab')).toBe(false);
      expect(isValidUsername('a'.repeat(21))).toBe(false);
      expect(isValidUsername('john-doe')).toBe(false);
      expect(isValidUsername('john doe')).toBe(false);
      expect(isValidUsername(null)).toBe(false);
    });
  });

  describe('isValidEmail', () => {
    it('should return true for valid emails', () => {
      expect(isValidEmail('user@example.com')).toBe(true);
      expect(isValidEmail('john.doe@company.co.uk')).toBe(true);
      expect(isValidEmail('test+tag@domain.org')).toBe(true);
    });

    it('should return false for invalid emails', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('invalid@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('user @example.com')).toBe(false);
      expect(isValidEmail(null)).toBe(false);
    });
  });
});
