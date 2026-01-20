'use client';

import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACTS } from '@/config/contracts';
import toast from 'react-hot-toast';

export default function GameDebugger() {
  const [isVisible, setIsVisible] = useState(false);
  const { address } = useAccount();
  
  const { writeContract: submitAnswers, isPending, data } = useWriteContract();
  const { isSuccess } = useWaitForTransactionReceipt({ hash: data });

  const completeGame = async (sessionId: number) => {
    // Submit dummy answers (all 0s) to complete the game
    const answers = Array(10).fill(0);
    
    try {
      toast.loading('Completing game...');
      submitAnswers({
        address: CONTRACTS.triviaGameV2.address,
        abi: CONTRACTS.triviaGameV2.abi,
        functionName: 'submitAnswers',
        args: [BigInt(sessionId), answers],
      });
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to complete game');
    }
  };

  if (isSuccess) {
    toast.dismiss();
    toast.success('Game completed! Check rewards page.');
  }

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-20 right-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm shadow-lg"
      >
        🎮 Game Debug
      </button>
    );
  }

  return (
    <div className="fixed bottom-20 right-4 bg-white rounded-lg shadow-xl p-4 border-2 border-purple-200 max-w-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-900">Game Debugger</h3>
        <button onClick={() => setIsVisible(false)} className="text-gray-400">✕</button>
      </div>
      
      <p className="text-sm text-gray-600 mb-3">
        Complete started games to earn rewards:
      </p>
      
      <div className="space-y-2">
        {[0, 1, 2, 3].map(sessionId => (
          <button
            key={sessionId}
            onClick={() => completeGame(sessionId)}
            disabled={isPending}
            className="w-full bg-purple-100 hover:bg-purple-200 text-purple-700 px-3 py-2 rounded text-sm"
          >
            Complete Game {sessionId + 1}
          </button>
        ))}
      </div>
    </div>
  );
}