import { PlayerInfo } from './contract';

export interface User {
  address: string;
  username: string;
  email?: string;
  profileImage?: string;
  bio?: string;
  joinedAt: string;
  lastActivity: string;
  isActive: boolean;
}

export interface UserProfile extends User {
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

export interface UserStatistics {
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

export interface UserBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  progress: number;
  maxProgress: number;
  isCompleted: boolean;
  completedAt?: string;
  reward: number;
}

export interface UserRegistrationRequest {
  address: string;
  username: string;
}

export interface UserRegistrationResponse {
  success: boolean;
  user?: User;
  error?: string;
}

export interface UserUpdateRequest {
  username?: string;
  email?: string;
  profileImage?: string;
  bio?: string;
}

export interface UserUpdateResponse {
  success: boolean;
  user?: User;
  error?: string;
}

export interface UserSession {
  sessionId: string;
  userId: string;
  address: string;
  loginAt: string;
  expiresAt: string;
  token: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notifications: boolean;
  emailNotifications: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}
