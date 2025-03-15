import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import { quizConfigAtom } from '../atoms';
import { useQuizActions } from '../hooks/useQuizActions';
import { QuizPreview } from '../components/QuizPreview';
import { QuizResult } from '../components/QuizResult';

export const QuizPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [showResult, setShowResult] = React.useState(false);
  const [, setConfig] = useAtom(quizConfigAtom);
  const { loading, loadQuiz } = useQuizActions();

  useEffect(() => {
    if (id) {
      loadQuiz(id).then((config) => {
        if (config) {
          setConfig(config);
        }
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Take Quiz</h1>
      {showResult ? (
        <QuizResult />
      ) : (
        <>
          <QuizPreview isAnswering={true} />
          <button
            onClick={() => setShowResult(true)}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </>
      )}
    </div>
  );
};