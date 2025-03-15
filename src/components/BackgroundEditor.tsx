import { useAtom } from 'jotai';
import { motion } from 'framer-motion';
import { FiFileText } from 'react-icons/fi';
import { quizConfigAtom } from '../atoms';

export const BackgroundEditor: React.FC = () => {
  const [config, setConfig] = useAtom(quizConfigAtom);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 bg-white rounded-xl shadow-lg ring-1 ring-gray-100 hover:ring-blue-200 transition-all"
    >
      <div className="flex items-center gap-2 mb-4">
        <FiFileText className="text-blue-500 text-xl" />
        <h2 className="text-xl font-bold text-gray-800">Background Information</h2>
      </div>
      <textarea
        value={config.background}
        onChange={(e) => setConfig(prev => ({ ...prev, background: e.target.value }))}
        className="w-full h-40 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        placeholder="Enter background information"
      />
    </motion.div>
  );
};