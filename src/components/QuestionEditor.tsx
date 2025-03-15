import React from 'react';
import { useAtom } from 'jotai';
import { nanoid } from 'nanoid';
import { FaPlus } from 'react-icons/fa';
import { quizConfigAtom } from '../atoms';
import type { Question, Option } from '../types';
import { QuestionItem } from './question/QuestionItem';

export const QuestionEditor: React.FC = () => {
  const [config, setConfig] = useAtom(quizConfigAtom);

  const handleQuestionAdd = () => {
    const newQuestion: Question = {
      id: nanoid(),
      text: '',
      type: 'single',
      options: []
    };
    setConfig((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));
  };

  const handleQuestionChange = (questionId: string, changes: Partial<Question>) => {
    setConfig((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId ? { ...q, ...changes } : q
      )
    }));
  };

  const handleQuestionDelete = (questionId: string) => {
    setConfig((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== questionId)
    }));
  };

  const handleOptionAdd = (questionId: string) => {
    const newOption: Option = {
      id: nanoid(),
      text: '',
      isCorrect: false
    };
    setConfig((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId
          ? { ...q, options: [...q.options, newOption] }
          : q
      )
    }));
  };

  const handleOptionChange = (questionId: string, optionId: string, changes: Partial<Option>) => {
    setConfig((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((o) =>
                o.id === optionId
                  ? { ...o, ...changes }
                  : q.type === 'single' && changes.isCorrect
                  ? { ...o, isCorrect: false }
                  : o
              )
            }
          : q
      )
    }));
  };

  const handleOptionDelete = (questionId: string, optionId: string) => {
    setConfig((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.filter((o) => o.id !== optionId)
            }
          : q
      )
    }));
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-bold mb-4">Questions</h2>
      {config.questions.map((question, index) => (
        <QuestionItem
          key={question.id}
          question={question}
          index={index}
          onQuestionChange={handleQuestionChange}
          onQuestionDelete={handleQuestionDelete}
          onOptionAdd={handleOptionAdd}
          onOptionChange={handleOptionChange}
          onOptionDelete={handleOptionDelete}
        />
      ))}
      <button
        onClick={handleQuestionAdd}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center space-x-2"
      >
        <FaPlus /> <span>Add Question</span>
      </button>
    </div>
  );
};