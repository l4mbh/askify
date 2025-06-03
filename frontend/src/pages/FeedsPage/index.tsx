import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { themeAwareText } from '../../styles/theme';
import { Card, LoadingSpinner } from '../../components/ui';
import QuestionFilters from './QuestionFilters';
import QuestionCard from './QuestionCard';
import type { Question, FilterOptions } from './types';

const FeedsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const PageTitle = styled.h1`
  ${themeAwareText}
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const PageSubtitle = styled.p`
  ${themeAwareText}
  font-size: 1.1rem;
  opacity: 0.8;
  margin-bottom: 0;
`;

const ContentSection = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const FiltersColumn = styled.div`
  position: sticky;
  top: 20px;
  height: fit-content;
  
  @media (max-width: 768px) {
    position: static;
  }
`;

const QuestionsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const EmptyState = styled(Card)`
  text-align: center;
  padding: 60px 20px;
`;

const EmptyStateText = styled.p`
  ${themeAwareText}
  font-size: 1.1rem;
  opacity: 0.7;
`;

// Mock data cho demo
const mockQuestions: Question[] = [
  {
    id: '1',
    title: 'React Hook nào tốt nhất để quản lý state phức tạp?',
    content: 'Tôi đang xây dựng một ứng dụng React lớn và cần quản lý state phức tạp. useState có vẻ không đủ mạnh. Các bạn có thể gợi ý Hook nào phù hợp không?',
    author: {
      id: 'user1',
      name: 'Nguyễn Văn A',
      avatar: 'https://i.pravatar.cc/40?img=1',
      reputation: 1250
    },
    tags: ['react', 'hooks', 'state-management', 'frontend'],
    subject: 'Frontend Development',
    votes: 15,
    answers: 8,
    views: 234,
    createdAt: new Date('2024-01-15T10:30:00Z'),
    isAnswered: true,
    isHot: true
  },
  {
    id: '2', 
    title: 'Cách tối ưu performance cho database MongoDB?',
    content: 'Database MongoDB của tôi đang chậm khi query lượng data lớn. Có cách nào để tối ưu không?',
    author: {
      id: 'user2',
      name: 'Trần Thị B',
      avatar: 'https://i.pravatar.cc/40?img=2',
      reputation: 890
    },
    tags: ['mongodb', 'database', 'performance', 'optimization'],
    subject: 'Backend Development',
    votes: 12,
    answers: 5,
    views: 167,
    createdAt: new Date('2024-01-14T15:45:00Z'),
    isAnswered: false,
    isHot: false
  },
  {
    id: '3',
    title: 'Machine Learning cho người mới bắt đầu nên học gì?',
    content: 'Tôi là sinh viên IT năm 2, muốn tìm hiểu về ML. Roadmap nào phù hợp cho beginner?',
    author: {
      id: 'user3',
      name: 'Phạm Văn C',
      avatar: 'https://i.pravatar.cc/40?img=3',
      reputation: 450
    },
    tags: ['machine-learning', 'beginner', 'python', 'data-science'],
    subject: 'Data Science',
    votes: 8,
    answers: 12,
    views: 89,
    createdAt: new Date('2024-01-13T09:20:00Z'),
    isAnswered: true,
    isHot: false
  },
  {
    id: '4',
    title: 'TypeScript có thực sự cần thiết cho dự án React không?',
    content: 'Team tôi đang tranh luận về việc có nên migrate từ JavaScript sang TypeScript. Ưu nhược điểm ra sao?',
    author: {
      id: 'user4',
      name: 'Lê Thị D',
      avatar: 'https://i.pravatar.cc/40?img=4',
      reputation: 2100
    },
    tags: ['typescript', 'javascript', 'react', 'migration'],
    subject: 'Frontend Development',
    votes: 23,
    answers: 15,
    views: 456,
    createdAt: new Date('2024-01-12T14:10:00Z'),
    isAnswered: true,
    isHot: true
  }
];

const subjects = ['Tất cả', 'Frontend Development', 'Backend Development', 'Data Science', 'Mobile Development', 'DevOps'];

function FeedsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: 'newest',
    subject: 'Tất cả',
    tags: [],
    showAnsweredOnly: false,
    showHotOnly: false
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setQuestions(mockQuestions);
      setFilteredQuestions(mockQuestions);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = [...questions];

    // Filter by subject
    if (filters.subject !== 'Tất cả') {
      filtered = filtered.filter(q => q.subject === filters.subject);
    }

    // Filter by tags
    if (filters.tags.length > 0) {
      filtered = filtered.filter(q => 
        filters.tags.some(tag => q.tags.includes(tag))
      );
    }

    // Filter answered only
    if (filters.showAnsweredOnly) {
      filtered = filtered.filter(q => q.isAnswered);
    }

    // Filter hot only
    if (filters.showHotOnly) {
      filtered = filtered.filter(q => q.isHot);
    }

    // Sort questions
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'votes':
          return b.votes - a.votes;
        case 'answers':
          return b.answers - a.answers;
        case 'views':
          return b.views - a.views;
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    setFilteredQuestions(filtered);
  }, [questions, filters]);

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  if (loading) {
    return (
      <FeedsContainer>
        <LoadingSpinner 
          size="lg"
          variant="dots"
          text="Đang tải câu hỏi..."
        />
      </FeedsContainer>
    );
  }

  return (
    <FeedsContainer>
      <PageHeader>
        <PageTitle>Khám Phá Câu Hỏi</PageTitle>
        <PageSubtitle>
          Tìm hiểu và học hỏi từ cộng đồng {questions.length} câu hỏi
        </PageSubtitle>
      </PageHeader>

      <ContentSection>
        <FiltersColumn>
          <QuestionFilters 
            filters={filters}
            onFiltersChange={handleFiltersChange}
            subjects={subjects}
            availableTags={Array.from(new Set(questions.flatMap(q => q.tags)))}
          />
        </FiltersColumn>

        <QuestionsColumn>
          {filteredQuestions.length === 0 ? (
            <EmptyState>
              <EmptyStateText>
                Không tìm thấy câu hỏi nào phù hợp với bộ lọc đã chọn.
              </EmptyStateText>
            </EmptyState>
          ) : (
            filteredQuestions.map(question => (
              <QuestionCard key={question.id} question={question} />
            ))
          )}
        </QuestionsColumn>
      </ContentSection>
    </FeedsContainer>
  );
}

export default FeedsPage; 