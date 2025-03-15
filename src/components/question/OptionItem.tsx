import React from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';
import type { OptionItemProps } from '../../types';

export const OptionItem: React.FC<OptionItemProps> = React.memo(({
  option,
  question,
  onOptionChange,
  onOptionDelete
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg group transition-colors"
    >
      <input
        type={question.type === 'single' ? 'radio' : 'checkbox'}
        checked={option.isCorrect}
        onChange={(e) => {
          onOptionChange(question.id, option.id, { isCorrect: e.target.checked });
        }}
        className="w-5 h-5 text-blue-500 focus:ring-blue-500"
      />
      <input
        type="text"
        value={option.text}
        onChange={(e) => {
          onOptionChange(question.id, option.id, { text: e.target.value });
        }}
        className="flex-1 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        placeholder="Enter option text"
      />
      <button
        onClick={() => onOptionDelete(question.id, option.id)}
        className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
      >
        <FiTrash2 />
      </button>
    </motion.div>
  );
});