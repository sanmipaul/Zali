'use client';

import { motion } from 'framer-motion';
import AchievementShowcase from '@/components/AchievementShowcase';

export default function AchievementsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50"
    >
      <div className="container mx-auto px-4 py-8">
        <AchievementShowcase />
      </div>
    </motion.div>
  );
}