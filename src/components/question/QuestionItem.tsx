import React from 'react';
import { motion } from 'framer-motion';
import { FiTrash2, FiPlus } from 'react-icons/fi';
import type { QuestionItemProps } from '../../types';
import { OptionItem } from './OptionItem';

export const QuestionItem: React.FC<QuestionItemProps> = React.memo(({
  question,
  index,
  onQuestionChange,
  onQuestionDelete,
  onOptionAdd,
  onOptionChange,
  onOptionDelete
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="mb-6 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border-l-4 border-blue-50 hover:border-blue-200"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Question {index + 1}</h3>
        <button
          onClick={() => onQuestionDelete(question.id)}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
        >
          <FiTrash2 />
        </button>
      </div>
      <input
        type="text"
        value={question.text}
        onChange={(e) => onQuestionChange(question.id, { text: e.target.value })}
        className="w-full p-3 border border-gray-200 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        placeholder="Enter question text"
      />
      <div className="mb-4">
        <select
          value={question.type}
          onChange={(e) => onQuestionChange(question.id, { type: e.target.value as 'single' | 'multiple' })}
          className="p-3 border border-gray-200 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="single">Single Choice</option>
          <option value="multiple">Multiple Choice</option>
        </select>
      </div>
      <div className="space-y-3">
        {question.options.map((option) => (
          <OptionItem
            key={option.id}
            option={option}
            question={question}
            onOptionChange={onOptionChange}
            onOptionDelete={onOptionDelete}
          />
        ))}
      </div>
      <button
        onClick={() => onOptionAdd(question.id)}
        className="mt-4 px-4 py-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg flex items-center gap-2 transition-colors"
      >
        <FiPlus /> <span>Add Option</span>
      </button>
    </motion.div>
  );
});