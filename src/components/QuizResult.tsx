import React from 'react';
import { useAtom } from 'jotai';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { quizConfigAtom, quizAnswersAtom } from '../atoms';

export const QuizResult: React.FC = () => {
  const [config] = useAtom(quizConfigAtom);
  const [answers] = useAtom(quizAnswersAtom);

  const calculateScore = () => {
    let correctCount = 0;
    let totalQuestions = config.questions.length;

    config.questions.forEach((question) => {
      const userAnswer = answers.find((a) => a.questionId === question.id);
      if (!userAnswer) return;

      const correctOptions = question.options
        .filter((o) => o.isCorrect)
        .map((o) => o.id);

      const isCorrect =
        userAnswer.selectedOptions.length === correctOptions.length &&
        userAnswer.selectedOptions.every((id) => correctOptions.includes(id));

      if (isCorrect) correctCount++;
    });

    return {
      score: correctCount,
      total: totalQuestions,
      percentage: Math.round((correctCount / totalQuestions) * 100)
    };
  };

  const score = calculateScore();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6">Quiz Results</h2>
      <div className="text-center p-6 mb-8 bg-gray-50 rounded-xl">
        <div className="text-4xl font-bold text-blue-600 mb-2">
          {score.score} / {score.total}
        </div>
        <div className="text-xl text-gray-600">
          Score: {score.percentage}%
        </div>
      </div>

      <div className="space-y-6">
        {config.questions.map((question, index) => {
          const userAnswer = answers.find(a => a.questionId === question.id);
          const correctOptions = question.options.filter(o => o.isCorrect);
          const isCorrect = userAnswer && correctOptions.every(o => 
            userAnswer.selectedOptions.includes(o.id)
          ) && userAnswer.selectedOptions.length === correctOptions.length;

          return (
            <div key={question.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                {isCorrect ? (
                  <FiCheckCircle className="text-green-500 text-xl" />
                ) : (
                  <FiXCircle className="text-red-500 text-xl" />
                )}
                <h3 className="font-medium">Question {index + 1}</h3>
              </div>
              
              <p className="mb-4">{question.text}</p>
              
              <div className="space-y-2">
                {question.options.map(option => {
                  const isSelected = userAnswer?.selectedOptions.includes(option.id);
                  const isCorrectOption = option.isCorrect;
                  
                  let bgColor = 'bg-white';
                  if (isSelected && isCorrectOption) bgColor = 'bg-green-50 border-green-200';
                  else if (isSelected && !isCorrectOption) bgColor = 'bg-red-50 border-red-200';
                  else if (!isSelected && isCorrectOption) bgColor = 'bg-green-50 border-green-200';
                  
                  return (
                    <div 
                      key={option.id}
                      className={`p-3 rounded-lg border ${bgColor}`}
                    >
                      {option.text}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};