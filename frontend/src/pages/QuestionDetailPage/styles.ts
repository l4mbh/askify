import styled from 'styled-components';

// Container chính cho QuestionDetailPage
export const QuestionDetailContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 16px;
  box-shadow: 0 4px 32px 0 rgba(0, 0, 0, 0.12);
  padding: 2rem;
  margin: 2rem;
  width: 100%;
  max-width: 1000px;
  color: #1f2937;
  
  .dark & {
    background-color: rgba(36, 36, 36, 0.6);
    box-shadow: 0 4px 32px 0 rgba(0, 0, 0, 0.24);
    color: #f9fafb;
  }

  @media (max-width: 640px) {
    margin: 1rem;
    padding: 1.5rem;
  }
`;

// Question header
export const QuestionHeader = styled.div`
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(156, 163, 175, 0.3);
  padding-bottom: 1.5rem;
`;

// Question title
export const QuestionTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  line-height: 1.3;
  
  @media (max-width: 640px) {
    font-size: 1.5rem;
  }
`;

// Question meta info
export const QuestionMeta = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  font-size: 0.875rem;
  color: #6b7280;
  
  .dark & {
    color: #9ca3af;
  }
`;

// Question content
export const QuestionContent = styled.div`
  margin: 1.5rem 0;
  line-height: 1.7;
  font-size: 1rem;
`;

// Tags container
export const TagsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin: 1rem 0;
`;

// Tag
export const Tag = styled.span`
  background-color: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  
  .dark & {
    background-color: rgba(96, 165, 250, 0.2);
    color: #60a5fa;
  }
`;

// Vote section
export const VoteSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-right: 1rem;
  
  @media (max-width: 640px) {
    flex-direction: row;
    margin-right: 0;
    margin-bottom: 1rem;
  }
`;

// Vote button
export const VoteButton = styled.button`
  background: none;
  border: 1px solid rgba(156, 163, 175, 0.5);
  border-radius: 8px;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: inherit;
  
  &:hover {
    background-color: rgba(59, 130, 246, 0.1);
    border-color: #3b82f6;
  }
  
  &.active {
    background-color: #3b82f6;
    color: white;
    border-color: #3b82f6;
  }
`;

// Vote count
export const VoteCount = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: #10b981;
  
  .dark & {
    color: #34d399;
  }
`;

// Answers section
export const AnswersSection = styled.div`
  margin-top: 3rem;
`;

// Answers title
export const AnswersTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(156, 163, 175, 0.3);
  padding-bottom: 0.5rem;
`;

// Answer item
export const AnswerItem = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-left: 4px solid #10b981;
  
  .dark & {
    background-color: rgba(55, 65, 81, 0.3);
  }
`;

// Answer content
export const AnswerContent = styled.div`
  line-height: 1.7;
  margin-bottom: 1rem;
`;

// Answer footer
export const AnswerFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: #6b7280;
  
  .dark & {
    color: #9ca3af;
  }
  
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`; 