import React from 'react';
import { useAtom } from 'jotai';
import MDEditor from '@uiw/react-md-editor';
import { quizConfigAtom, quizAnswersAtom } from '../atoms';
import { motion } from 'framer-motion';

export const QuizPreview: React.FC<{ isAnswering?: boolean }> = ({ isAnswering = false }) => {
  const [config] = useAtom(quizConfigAtom);
  const [answers, setAnswers] = useAtom(quizAnswersAtom);

  const handleOptionSelect = (questionId: string, optionId: string) => {
    setAnswers(prev => {
      const existingAnswer = prev.find(a => a.questionId === questionId);
      const question = config.questions.find(q => q.id === questionId);
      
      if (!question) return prev;

      // 单选题：直接替换选项
      if (question.type === 'single') {
        return [
          ...prev.filter(a => a.questionId !== questionId),
          { questionId, selectedOptions: [optionId] }
        ];
      }

      // 多选题：切换选项状态
      if (existingAnswer) {
        const newOptions = existingAnswer.selectedOptions.includes(optionId)
          ? existingAnswer.selectedOptions.filter(id => id !== optionId)
          : [...existingAnswer.selectedOptions, optionId];
        
        return [
          ...prev.filter(a => a.questionId !== questionId),
          { questionId, selectedOptions: newOptions }
        ];
      }

      // 新答案
      return [...prev, { questionId, selectedOptions: [optionId] }];
    });
  };

  // 添加空状态提示
  if (!config.background && config.questions.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 bg-white rounded-xl shadow-lg mt-6"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-6">Preview</h2>
        <div className="text-center p-8 text-gray-500">
          <p>No content to preview yet.</p>
          <p>Please add some background information and questions first.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 bg-white rounded-xl shadow-lg mt-6"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        {isAnswering ? 'Quiz' : 'Preview'}
      </h2>
      <div className="prose max-w-none mb-8 whitespace-pre-wrap">
        {config.background}
      </div>
      {config.questions.map((question, index) => (
        <motion.div 
          key={question.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-6 bg-gray-50 rounded-xl border border-gray-100"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Question {index + 1}: {question.text}
          </h3>
          <div className="space-y-3">
            {question.options.map((option) => {
              const isSelected = answers
                .find((a) => a.questionId === question.id)
                ?.selectedOptions.includes(option.id);

              return (
                <div 
                  key={option.id} 
                  onClick={() => isAnswering && handleOptionSelect(question.id, option.id)}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer ${
                    isAnswering ? 'hover:bg-blue-50' : ''
                  } ${isSelected ? 'bg-blue-50 border border-blue-200' : 'hover:bg-white'}`}
                >
                  <input
                    type={question.type === 'single' ? 'radio' : 'checkbox'}
                    checked={isSelected || false}
                    onChange={() => {}} // 使用 div 的 onClick 处理
                    disabled={!isAnswering}
                    className="w-5 h-5 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{option.text}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};