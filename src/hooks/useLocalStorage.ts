import { nanoid } from 'nanoid';
import type { QuizConfig } from '../types';

export const useLocalStorage = () => {
  const saveQuiz = (config: QuizConfig): string => {
    try {
      const id = nanoid(8);
      const key = `quiz_${id}`;
      const data = JSON.stringify(config);
      
      // 确保数据有效
      if (!data) {
        throw new Error('Invalid quiz data');
      }
      
      localStorage.setItem(key, data);
      
      // 验证保存是否成功
      const saved = localStorage.getItem(key);
      if (!saved) {
        throw new Error('Failed to save quiz');
      }
      
      return id;
    } catch (error) {
      console.error('Save to localStorage error:', error);
      throw error;
    }
  };

  const loadQuiz = (id: string): QuizConfig | null => {
    try {
      const key = `quiz_${id}`;
      const data = localStorage.getItem(key);
      
      if (!data) {
        return null;
      }
      
      const config = JSON.parse(data);
      
      // 验证数据结构
      if (!config || !config.questions || !Array.isArray(config.questions)) {
        throw new Error('Invalid quiz format');
      }
      
      return config;
    } catch (error) {
      console.error('Load from localStorage error:', error);
      return null;
    }
  };

  return { saveQuiz, loadQuiz };
};