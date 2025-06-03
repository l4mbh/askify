export interface Author {
  id: string;
  name: string;
  avatar: string;
  reputation: number;
}

export interface Question {
  id: string;
  title: string;
  content: string;
  author: Author;
  tags: string[];
  subject: string;
  votes: number;
  answers: number;
  views: number;
  createdAt: Date;
  isAnswered: boolean;
  isHot: boolean;
}

export interface FilterOptions {
  sortBy: 'newest' | 'votes' | 'answers' | 'views';
  subject: string;
  tags: string[];
  showAnsweredOnly: boolean;
  showHotOnly: boolean;
}

export interface QuestionFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  subjects: string[];
  availableTags: string[];
}

export interface QuestionCardProps {
  question: Question;
} 