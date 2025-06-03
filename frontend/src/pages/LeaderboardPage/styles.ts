import styled from 'styled-components';

// Container chính cho LeaderboardPage
export const LeaderboardContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 16px;
  box-shadow: 0 4px 32px 0 rgba(0, 0, 0, 0.12);
  padding: 2rem;
  margin: 2rem;
  width: 100%;
  max-width: 900px;
  color: #1f2937;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
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

// Title cho trang leaderboard
export const LeaderboardTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
  
  @media (max-width: 640px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
`;

// Leaderboard list
export const LeaderboardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

// User rank item
export const UserRankItem = styled.div<{ rank: number }>`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-left: 4px solid ${props => 
    props.rank === 1 ? '#ffd700' : 
    props.rank === 2 ? '#c0c0c0' : 
    props.rank === 3 ? '#cd7f32' : '#3b82f6'
  };
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
  
  .dark & {
    background-color: rgba(55, 65, 81, 0.3);
    
    &:hover {
      background-color: rgba(55, 65, 81, 0.5);
    }
  }

  @media (max-width: 640px) {
    padding: 1rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

// Rank number
export const RankNumber = styled.div<{ rank: number }>`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => 
    props.rank === 1 ? '#ffd700' : 
    props.rank === 2 ? '#c0c0c0' : 
    props.rank === 3 ? '#cd7f32' : '#3b82f6'
  };
  min-width: 3rem;
  text-align: center;
`;

// User info
export const UserInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

// User name
export const UserName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: inherit;
`;

// User stats
export const UserStats = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  
  .dark & {
    color: #9ca3af;
  }
`;

// Score
export const Score = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #10b981;
  text-align: right;
  
  .dark & {
    color: #34d399;
  }

  @media (max-width: 640px) {
    text-align: left;
  }
`;

// Trophy for top 3
export const Trophy = styled.span`
  font-size: 1.5rem;
  margin-right: 0.5rem;
`; 