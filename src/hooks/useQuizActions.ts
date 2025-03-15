import { useState } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { quizConfigAtom } from '../atoms';
import { useLocalStorage } from './useLocalStorage';

export const useQuizActions = () => {
  const [loading, setLoading] = useState(false);
  const [config] = useAtom(quizConfigAtom);
  const navigate = useNavigate();
  const { saveQuiz: saveToLocal, loadQuiz: loadFromLocal } = useLocalStorage();

  const saveQuiz = async () => {
    try {
      setLoading(true);
      // 1. 保存测验
      const id = saveToLocal(config);
      
      // 2. 验证保存是否成功
      const savedConfig = loadFromLocal(id);
      if (!savedConfig) {
        throw new Error('Failed to verify saved quiz');
      }
      
      // 3. 生成飞书友好的链接
      const baseUrl = window.location.origin;
      const quizUrl = `${baseUrl}/#/quiz/${id}?source=feishu`;
      
      // 4. 复制链接到剪贴板
      await navigator.clipboard.writeText(quizUrl);
      toast.success('Quiz link copied! You can paste it in Feishu doc now.');
      
    } catch (error) {
      console.error('Save quiz error:', error);
      toast.error('Failed to save quiz');
    } finally {
      setLoading(false);
    }
  };

  const loadQuiz = async (id: string) => {
    try {
      setLoading(true);
      const config = loadFromLocal(id);
      
      if (!config) {
        // 特别处理从飞书文档访问的情况
        const isFromFeishu = new URLSearchParams(window.location.search).get('source') === 'feishu';
        if (isFromFeishu) {
          toast.error('Quiz not found. The quiz may have expired or been deleted.');
        } else {
          toast.error('Quiz not found');
        }
        navigate('/');
        return null;
      }

      // 验证配置有效性
      if (!config.questions || !Array.isArray(config.questions)) {
        toast.error('Invalid quiz format');
        navigate('/');
        return null;
      }

      return config;
    } catch (error) {
      console.error('Load quiz error:', error);
      toast.error('Failed to load quiz');
      navigate('/');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, saveQuiz, loadQuiz };
};