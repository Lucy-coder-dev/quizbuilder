import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { FiEye, FiEdit2 } from 'react-icons/fi';
import { isPreviewModeAtom } from './atoms';
import { QuizPreview } from './components/QuizPreview';
import { BackgroundEditor } from './components/BackgroundEditor';
import { QuestionEditor } from './components/QuestionEditor';
import { ShareButton } from './components/ShareButton';
import { QuizPage } from './pages/QuizPage';

const BuilderPage: React.FC = () => {
  const [isPreviewMode, setIsPreviewMode] = useAtom(isPreviewModeAtom);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto px-4"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            The QuizBuilder
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="px-6 py-2 bg-white border border-blue-500 text-blue-500 rounded-lg flex items-center gap-2 hover:bg-blue-50 transition-all"
            >
              {isPreviewMode ? <FiEdit2 /> : <FiEye />}
              <span>{isPreviewMode ? 'Edit Mode' : 'Preview Mode'}</span>
            </button>
            <ShareButton />
          </div>
        </div>
        
        {isPreviewMode ? (
          <QuizPreview />
        ) : (
          <>
            <BackgroundEditor />
            <QuestionEditor />
          </>
        )}
      </motion.div>
      <Toaster position="top-right" />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<BuilderPage />} />
        <Route path="/quiz/:id" element={<QuizPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;