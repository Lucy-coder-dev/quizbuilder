import React from 'react';
import { motion } from 'framer-motion';
import { FiShare2 } from 'react-icons/fi';
import { useQuizActions } from '../hooks/useQuizActions';

export const ShareButton: React.FC = () => {
  const { loading, saveQuiz } = useQuizActions();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={saveQuiz}
      disabled={loading}
      className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
    >
      <FiShare2 />
      <span>{loading ? 'Saving...' : 'Share Quiz'}</span>
    </motion.button>
  );
};