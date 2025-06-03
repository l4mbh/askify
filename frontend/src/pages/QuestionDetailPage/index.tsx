import { useParams } from 'react-router-dom';
import {
  QuestionDetailContainer,
  QuestionHeader,
  QuestionTitle,
  QuestionMeta,
  QuestionContent,
  TagsContainer,
  Tag,
  VoteSection,
  VoteButton,
  VoteCount,
  AnswersSection,
  AnswersTitle,
  AnswerItem,
  AnswerContent,
  AnswerFooter
} from './styles';

// Trang chi tiết câu hỏi
function QuestionDetailPage() {
  const { id } = useParams();
  
  // Dữ liệu câu hỏi mẫu
  const question = {
    id: id,
    title: 'Cách sử dụng React Hooks trong component function?',
    content: `Tôi đang học React và muốn hiểu về React Hooks. Cụ thể là:

1. useState hook hoạt động như thế nào?
2. useEffect hook dùng khi nào?
3. Có những best practices nào khi sử dụng hooks?

Mong các bạn giải thích chi tiết và có ví dụ cụ thể.`,
    tags: ['react', 'javascript', 'hooks', 'frontend'],
    votes: 15,
    views: 234,
    author: 'Nguyễn Văn A',
    createdAt: '2 giờ trước'
  };

  const answers = [
    {
      id: 1,
      content: `React Hooks là một tính năng quan trọng được giới thiệu từ React 16.8. Dưới đây là giải thích chi tiết:

**1. useState Hook:**
\`\`\`jsx
const [count, setCount] = useState(0);
\`\`\`

**2. useEffect Hook:**
\`\`\`jsx
useEffect(() => {
  // Side effects here
}, [dependencies]);
\`\`\`

**3. Best Practices:**
- Luôn sử dụng hooks ở top level của component
- Tránh gọi hooks trong loops, conditions, nested functions`,
      votes: 8,
      author: 'Trần Thị B',
      createdAt: '1 giờ trước'
    },
    {
      id: 2,
      content: `Bổ sung thêm về useEffect:

useEffect có thể được sử dụng để:
- Fetch data từ API
- Subscribe/unsubscribe events
- Cleanup resources
- Update document title

Ví dụ fetch data:
\`\`\`jsx
useEffect(() => {
  fetchData().then(setData);
}, []);
\`\`\``,
      votes: 5,
      author: 'Lê Văn C',
      createdAt: '30 phút trước'
    }
  ];

  return (
    <QuestionDetailContainer>
      <QuestionHeader>
        <QuestionTitle>{question.title}</QuestionTitle>
        <QuestionMeta>
          <span>Đăng bởi {question.author}</span>
          <span>{question.createdAt}</span>
          <span>{question.views} lượt xem</span>
        </QuestionMeta>
      </QuestionHeader>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <VoteSection>
          <VoteButton>↑</VoteButton>
          <VoteCount>{question.votes}</VoteCount>
          <VoteButton>↓</VoteButton>
        </VoteSection>
        
        <div style={{ flex: 1 }}>
          <QuestionContent>{question.content}</QuestionContent>
          <TagsContainer>
            {question.tags.map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </TagsContainer>
        </div>
      </div>

      <AnswersSection>
        <AnswersTitle>{answers.length} Câu trả lời</AnswersTitle>
        {answers.map(answer => (
          <AnswerItem key={answer.id}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <VoteSection>
                <VoteButton>↑</VoteButton>
                <VoteCount>{answer.votes}</VoteCount>
                <VoteButton>↓</VoteButton>
              </VoteSection>
              <div style={{ flex: 1 }}>
                <AnswerContent>{answer.content}</AnswerContent>
                <AnswerFooter>
                  <span>Trả lời bởi {answer.author}</span>
                  <span>{answer.createdAt}</span>
                </AnswerFooter>
              </div>
            </div>
          </AnswerItem>
        ))}
      </AnswersSection>
    </QuestionDetailContainer>
  );
}

export default QuestionDetailPage; 