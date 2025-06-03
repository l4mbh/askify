import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { acrylicButton, themeAwareText, themeAwareTextHover, colors } from '../../styles/theme';
import { Card } from '../../components/ui';
import type { QuestionCardProps } from './types';

const QuestionCardContainer = styled(Card)`
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
  gap: 15px;
`;

const QuestionTitle = styled(Link)`
  ${themeAwareText}
  ${themeAwareTextHover}
  font-size: 1.25rem;
  font-weight: 600;
  text-decoration: none;
  line-height: 1.4;
  flex: 1;
  
  &:hover {
    text-decoration: underline;
  }
`;

const StatusBadges = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-shrink: 0;
`;

const Badge = styled.span<{ $variant: 'answered' | 'hot' | 'unanswered' }>`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  
  ${props => {
    switch (props.$variant) {
      case 'answered':
        return `
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
        `;
      case 'hot':
        return `
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: white;
        `;
      case 'unanswered':
        return `
          background: ${colors.light.background.secondary};
          color: ${colors.light.text.secondary};
          border: 1px solid ${colors.light.border.secondary};
          
          .dark & {
            background: ${colors.dark.background.secondary};
            color: ${colors.dark.text.secondary};
            border: 1px solid ${colors.dark.border.secondary};
          }
        `;
    }
  }}
`;

const QuestionContent = styled.p`
  ${themeAwareText}
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  opacity: 0.8;
`;

const QuestionMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  gap: 15px;
  flex-wrap: wrap;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AuthorAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const AuthorDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.span`
  ${themeAwareText}
  font-weight: 600;
  font-size: 0.9rem;
`;

const AuthorReputation = styled.span`
  ${themeAwareText}
  font-size: 0.8rem;
  opacity: 0.7;
`;

const QuestionStats = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  ${themeAwareText}
  font-size: 0.85rem;
`;

const StatNumber = styled.span`
  font-weight: 600;
  color: #667eea;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
`;

const Tag = styled.span`
  ${acrylicButton}
  padding: 4px 10px;
  font-size: 0.8rem;
  border-radius: 16px;
  background: ${colors.light.background.secondary};
  color: ${colors.light.text.secondary};
  
  .dark & {
    background: ${colors.dark.background.secondary};
    color: ${colors.dark.text.secondary};
  }
`;

const QuestionFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const SubjectBadge = styled.span`
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.8rem;
  font-weight: 500;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`;

const TimeStamp = styled.span`
  ${themeAwareText}
  font-size: 0.8rem;
  opacity: 0.6;
`;

function QuestionCard({ question }: QuestionCardProps) {
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Vừa xong';
    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} ngày trước`;
    return date.toLocaleDateString('vi-VN');
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <QuestionCardContainer>
      <QuestionHeader>
        <QuestionTitle to={`/question/${question.id}`}>
          {question.title}
        </QuestionTitle>
        <StatusBadges>
          {question.isHot && <Badge $variant="hot">🔥 Hot</Badge>}
          <Badge $variant={question.isAnswered ? 'answered' : 'unanswered'}>
            {question.isAnswered ? '✓ Đã trả lời' : '⏳ Chưa trả lời'}
          </Badge>
        </StatusBadges>
      </QuestionHeader>

      <QuestionContent>
        {question.content}
      </QuestionContent>

      <QuestionMeta>
        <AuthorInfo>
          <AuthorAvatar src={question.author.avatar} alt={question.author.name} />
          <AuthorDetails>
            <AuthorName>{question.author.name}</AuthorName>
            <AuthorReputation>{formatNumber(question.author.reputation)} điểm</AuthorReputation>
          </AuthorDetails>
        </AuthorInfo>

        <QuestionStats>
          <StatItem>
            <StatNumber>{question.votes}</StatNumber>
            <span>votes</span>
          </StatItem>
          <StatItem>
            <StatNumber>{question.answers}</StatNumber>
            <span>trả lời</span>
          </StatItem>
          <StatItem>
            <StatNumber>{formatNumber(question.views)}</StatNumber>
            <span>lượt xem</span>
          </StatItem>
        </QuestionStats>
      </QuestionMeta>

      <TagsContainer>
        {question.tags.map(tag => (
          <Tag key={tag}>#{tag}</Tag>
        ))}
      </TagsContainer>

      <QuestionFooter>
        <SubjectBadge>{question.subject}</SubjectBadge>
        <TimeStamp>{formatTimeAgo(question.createdAt)}</TimeStamp>
      </QuestionFooter>
    </QuestionCardContainer>
  );
}

export default QuestionCard; 