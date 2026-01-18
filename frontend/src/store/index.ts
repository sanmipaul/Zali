import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createAuthSlice, AuthSlice } from './slices/authSlice';
import { createGameSlice, GameSlice } from './slices/gameSlice';
import { createUISlice, UISlice } from './slices/uiSlice';
import { createAchievementSlice, AchievementSlice } from './slices/achievementSlice';

export type RootState = AuthSlice & GameSlice & UISlice & AchievementSlice;

export const useStore = create<RootState>()(
  devtools(
    persist(
      immer((...a) => ({
        ...createAuthSlice(...a),
        ...createGameSlice(...a),
        ...createUISlice(...a),
        ...createAchievementSlice(...a),
      })),
      {
        name: 'zali-store',
        partialize: (state) => ({
          auth: {
            user: state.user,
            isAuthenticated: state.isAuthenticated,
          },
          ui: {
            theme: state.theme,
            notifications: state.notifications,
          },
          achievements: state.achievements,
          globalStats: state.globalStats,
        }),
      }
    )
  )
);