import { motion } from 'framer-motion';
import { TrophyIcon, UserCircleIcon } from '@heroicons/react/24/outline';

type LeaderboardEntry = {
  address: string;
  username: string;
  totalScore: number;
  rank: number;
};

type LeaderboardProps = {
  data: LeaderboardEntry[];
  currentUserAddress?: string;
  className?: string;
};

export function Leaderboard({ data, currentUserAddress, className = '' }: LeaderboardProps) {
  // Find current user's position if not in top 10
  const currentUserEntry = currentUserAddress 
    ? data.find(entry => entry.address.toLowerCase() === currentUserAddress.toLowerCase())
    : null;

  // Get top 10 entries
  const topEntries = data.slice(0, 10);

  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-yellow-100 text-yellow-600';
      case 2: return 'bg-gray-100 text-gray-600';
      case 3: return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-50 text-gray-500';
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${className}`}>
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <TrophyIcon className="h-5 w-5 text-yellow-500 mr-2" />
          Leaderboard
        </h3>
      </div>
      
      <div className="divide-y divide-gray-200">
        {topEntries.map((entry, index) => (
          <motion.div 
            key={entry.address}
            className={`flex items-center px-6 py-4 ${
              entry.address.toLowerCase() === currentUserAddress?.toLowerCase() 
                ? 'bg-blue-50' 
                : ''
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center font-medium text-sm ${getMedalColor(entry.rank)}`}>
              {entry.rank}
            </div>
            <div className="ml-4 flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {entry.username || `Player ${entry.rank}`}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {`${entry.address.slice(0, 6)}...${entry.address.slice(-4)}`}
              </p>
            </div>
            <div className="ml-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {entry.totalScore} pts
              </span>
            </div>
          </motion.div>
        ))}
        
        {currentUserEntry && !topEntries.some(e => e.address === currentUserAddress) && (
          <>
            <div className="h-px bg-gray-200 w-full my-2"></div>
            <div className="px-6 py-3 bg-blue-50">
              <div className="flex items-center">
                <UserCircleIcon className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm font-medium text-gray-700">Your rank: {currentUserEntry.rank}</span>
                <span className="ml-auto text-sm font-medium text-gray-700">
                  {currentUserEntry.totalScore} pts
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
