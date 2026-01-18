import React from 'react';
import { useStore } from '@/store';
import { Achievement } from '@/types/achievement';

const AchievementCard: React.FC<{ achievement: Achievement }> = ({ achievement }) => (
  <div className={`p-4 border rounded-lg ${achievement.isUnlocked ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
    <div className="flex items-center space-x-3">
      <span className="text-2xl">{achievement.icon}</span>
      <div>
        <h3 className="font-semibold">{achievement.title}</h3>
        <p className="text-sm text-gray-600">{achievement.description}</p>
        {achievement.progress !== undefined && achievement.target && (
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${Math.min((achievement.progress / achievement.target) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{achievement.progress}/{achievement.target}</p>
          </div>
        )}
        {achievement.isUnlocked && achievement.unlockedAt && (
          <p className="text-xs text-green-600 mt-1">Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString()}</p>
        )}
      </div>
    </div>
  </div>
);

const AchievementShowcase: React.FC = () => {
  const { achievements } = useStore();

  const unlockedAchievements = achievements.filter(a => a.isUnlocked);
  const lockedAchievements = achievements.filter(a => !a.isUnlocked);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Achievements</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Unlocked ({unlockedAchievements.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {unlockedAchievements.map(achievement => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Locked ({lockedAchievements.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lockedAchievements.map(achievement => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementShowcase;