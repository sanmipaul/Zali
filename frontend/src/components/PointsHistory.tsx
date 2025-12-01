import { ClockIcon, CheckCircleIcon, XCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

type PointsHistoryEntry = {
  id: string;
  type: 'game' | 'reward' | 'bonus' | 'other';
  points: number;
  description: string;
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed';
};

type PointsHistoryProps = {
  history: PointsHistoryEntry[];
  className?: string;
};

export function PointsHistory({ history, className = '' }: PointsHistoryProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'failed':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <PlusCircleIcon className="h-5 w-5 text-blue-500" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'game': return 'Game Points';
      case 'reward': return 'Reward Redemption';
      case 'bonus': return 'Bonus Points';
      default: return 'Points';
    }
  };

  // Sort history by timestamp (newest first)
  const sortedHistory = [...history].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );

  // Format date to a readable string
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${className}`}>
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Points History</h3>
      </div>
      
      <div className="divide-y divide-gray-200">
        {sortedHistory.length > 0 ? (
          sortedHistory.map((entry) => (
            <div key={entry.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {getStatusIcon(entry.status)}
                </div>
                <div className="ml-4 flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {entry.description}
                  </p>
                  <p className="text-xs text-gray-500">
                    {getTypeLabel(entry.type)} • {formatDate(entry.timestamp)}
                  </p>
                </div>
                <div className="ml-4">
                  <span 
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      entry.points > 0 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {entry.points > 0 ? '+' : ''}{entry.points} pts
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center">
            <p className="text-sm text-gray-500">No points history available</p>
          </div>
        )}
      </div>
    </div>
  );
}
