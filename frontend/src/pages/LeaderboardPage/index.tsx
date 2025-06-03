import {
  LeaderboardContainer,
  LeaderboardTitle,
  LeaderboardList,
  UserRankItem,
  RankNumber,
  UserInfo,
  UserName,
  UserStats,
  Score,
  Trophy
} from './styles';

// Trang xếp hạng
function LeaderboardPage() {
  // Dữ liệu xếp hạng mẫu
  const leaderboard = [
    {
      rank: 1,
      name: 'Nguyễn Văn A',
      questions: 25,
      answers: 45,
      score: 1250
    },
    {
      rank: 2,
      name: 'Trần Thị B',
      questions: 18,
      answers: 38,
      score: 980
    },
    {
      rank: 3,
      name: 'Lê Văn C',
      questions: 22,
      answers: 30,
      score: 850
    },
    {
      rank: 4,
      name: 'Phạm Thị D',
      questions: 15,
      answers: 35,
      score: 720
    },
    {
      rank: 5,
      name: 'Hoàng Văn E',
      questions: 12,
      answers: 28,
      score: 650
    }
  ];

  const getTrophy = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '';
    }
  };

  return (
    <LeaderboardContainer>
      <LeaderboardTitle>Bảng xếp hạng</LeaderboardTitle>
      <LeaderboardList>
        {leaderboard.map(user => (
          <UserRankItem key={user.rank} rank={user.rank}>
            <RankNumber rank={user.rank}>
              <Trophy>{getTrophy(user.rank)}</Trophy>
              #{user.rank}
            </RankNumber>
            <UserInfo>
              <UserName>{user.name}</UserName>
              <UserStats>
                {user.questions} câu hỏi • {user.answers} câu trả lời
              </UserStats>
            </UserInfo>
            <Score>{user.score} điểm</Score>
          </UserRankItem>
        ))}
      </LeaderboardList>
    </LeaderboardContainer>
  );
}

export default LeaderboardPage; 