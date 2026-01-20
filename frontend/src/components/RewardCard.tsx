import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface RewardCardProps {
  icon: ReactNode;
  title: string;
  amount: string;
  description: string;
  color: string;
  action?: ReactNode;
}

export function RewardCard({ icon, title, amount, description, color, action }: RewardCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
      className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col"
    >
      <div className={`mb-4 ${color}`}>{icon}</div>
      <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
      <div className="text-2xl font-bold mb-2">{amount}</div>
      <p className="text-gray-600 text-sm mb-3">{description}</p>
      {action && <div className="mt-auto pt-2">{action}</div>}
    </motion.div>
  );
}
