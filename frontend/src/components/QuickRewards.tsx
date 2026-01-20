'use client';

import { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { CONTRACTS } from '@/config/contracts';
import toast from 'react-hot-toast';

export default function QuickRewards() {
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [sessionId, setSessionId] = useState<bigint | null>(null);
  const { address } = useAccount();
  
  const { writeContract: startGame, isPending: startPending, data: startData, error: startError } = useWriteContract();
  const { writeContract: submitAnswers, isPending: submitPending, data: submitData, error: submitError } = useWriteContract();
  
  const { isSuccess: startSuccess } = useWaitForTransactionReceipt({ hash: startData });
  const { isSuccess: submitSuccess } = useWaitForTransactionReceipt({ hash: submitData });

  // Get current session count to use next available session ID
  const { data: playerInfo } = useReadContract({
    address: CONTRACTS.triviaGameV2.address,
    abi: CONTRACTS.triviaGameV2.abi,
    functionName: 'getPlayerInfo',
    args: [address],
  });

  const handleStartGame = async () => {
    try {
      const nextSessionId = playerInfo ? (playerInfo as any[])[2] : 0n;
      setSessionId(nextSessionId);
      toast.loading('Starting new game...');
      startGame({
        address: CONTRACTS.triviaGameV2.address,
        abi: CONTRACTS.triviaGameV2.abi,
        functionName: 'startGame',
      });
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to start game');
      setStep(0);
    }
  };

  const handleCompleteGame = async () => {
    if (!sessionId) return;
    
    const answers = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1]; // 5 correct answers
    
    try {
      toast.loading('Completing game...');
      submitAnswers({
        address: CONTRACTS.triviaGameV2.address,
        abi: CONTRACTS.triviaGameV2.abi,
        functionName: 'submitAnswers',
        args: [sessionId, answers],
      });
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to complete game');
      setStep(0);
    }
  };

  useEffect(() => {
    if (startSuccess && step === 0) {
      toast.dismiss();
      toast.success('Game started! Completing it...');
      setStep(1);
      setTimeout(() => {
        handleCompleteGame();
      }, 2000);
    }
  }, [startSuccess, step]);

  useEffect(() => {
    if (submitSuccess && step === 1) {
      toast.dismiss();
      toast.success('Game completed! You earned CELO rewards!');
      setStep(2);
    }
  }, [submitSuccess, step]);

  useEffect(() => {
    if (startError) {
      toast.dismiss();
      toast.error('Failed to start game');
      setStep(0);
    }
  }, [startError]);

  useEffect(() => {
    if (submitError) {
      toast.dismiss();
      toast.error('Failed to complete game');
      setStep(0);
    }
  }, [submitError]);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-2xl animate-pulse z-50 border-2 border-white"
        style={{ zIndex: 9999 }}
      >
        💰 Earn Rewards
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-xl p-4 border-2 border-green-200 max-w-sm z-50" style={{ zIndex: 9999 }}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-900">Quick Rewards</h3>
        <button onClick={() => setIsVisible(false)} className="text-gray-400 hover:text-gray-600">✕</button>
      </div>
      
      <p className="text-sm text-gray-600 mb-3">
        Start and complete a fresh game to earn CELO:
      </p>
      
      {step === 0 && (
        <button
          onClick={handleStartGame}
          disabled={startPending}
          className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium"
        >
          {startPending ? '⏳ Starting...' : '🎮 Start & Complete Game'}
        </button>
      )}
      
      {step === 1 && (
        <div className="text-center">
          <div className="animate-spin text-2xl mb-2">⏳</div>
          <p className="text-sm text-gray-600">Completing game...</p>
        </div>
      )}
      
      {step === 2 && (
        <div className="text-center">
          <div className="text-2xl mb-2">🎉</div>
          <p className="text-sm text-green-600 font-medium">Rewards earned!</p>
          <button
            onClick={() => {
              setStep(0);
              window.location.reload();
            }}
            className="mt-2 text-xs text-blue-600 underline"
          >
            Refresh page
          </button>
        </div>
      )}
    </div>
  );
}