import { atom } from 'jotai';
import type { QuizConfig, QuizAnswer } from './types';

export const quizConfigAtom = atom<QuizConfig>({
  background: '',
  questions: []
});

export const quizAnswersAtom = atom<QuizAnswer[]>([]);

export const isPreviewModeAtom = atom<boolean>(false);