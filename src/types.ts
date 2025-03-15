export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
  type: 'single' | 'multiple';
}

export interface QuizConfig {
  background: string;
  questions: Question[];
}

export interface QuizAnswer {
  questionId: string;
  selectedOptions: string[];
}

export interface OptionItemProps {
  option: Option;
  question: Question;
  onOptionChange: (questionId: string, optionId: string, changes: Partial<Option>) => void;
  onOptionDelete: (questionId: string, optionId: string) => void;
}

export interface QuestionItemProps {
  question: Question;
  index: number;
  onQuestionChange: (questionId: string, changes: Partial<Question>) => void;
  onQuestionDelete: (questionId: string) => void;
  onOptionAdd: (questionId: string) => void;
  onOptionChange: (questionId: string, optionId: string, changes: Partial<Option>) => void;
  onOptionDelete: (questionId: string, optionId: string) => void;
}