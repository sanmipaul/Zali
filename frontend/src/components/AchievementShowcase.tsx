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

  const categories = ['milestone', 'streak', 'time', 'skill'];
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Achievements</h2>
      
      {categories.map(category => {
        const categoryAchievements = achievements.filter(a => a.category === category);
        const unlocked = categoryAchievements.filter(a => a.isUnlocked);
        const locked = categoryAchievements.filter(a => !a.isUnlocked);
        
        return (
          <div key={category} className="mb-8">
            <h3 className="text-xl font-semibold mb-4 capitalize">{category} Achievements ({unlocked.length}/{categoryAchievements.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {unlocked.map(achievement => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
            {locked.length > 0 && (
              <>
                <h4 className="text-lg font-medium mb-2">Locked</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {locked.map(achievement => (
                    <AchievementCard key={achievement.id} achievement={achievement} />
                  ))}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AchievementShowcase;