import { HomeContainer, PageTitle, ContentWrapper, GridContainer, FooterText } from './styles';
import { FeatureCard } from '../../components/ui';
import styled from 'styled-components';
import { themeAwareText } from '../../styles/theme';

// Styled component cho description text
const DescriptionText = styled.p`
  ${themeAwareText}
  text-align: center;
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
`;

// Trang chủ với theme-aware acrylic effects
function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <HomeContainer>
        <PageTitle>Chào mừng đến với Askify</PageTitle>
        <ContentWrapper>
          <DescriptionText>
            Nền tảng hỏi đáp theo chủ đề với hiệu ứng Acrylic Glass đẹp mắt
          </DescriptionText>
          
          <GridContainer>
            <FeatureCard
              icon="🔍"
              title="Tìm kiếm thông minh"
              description="Tìm kiếm câu hỏi và câu trả lời theo tags và chủ đề"
            />
            
            <FeatureCard
              icon="🏆"
              title="Hệ thống điểm"
              description="Tích lũy điểm qua việc trả lời và được đánh giá"
            />
            
            <FeatureCard
              icon="🔔"
              title="Thông báo realtime"
              description="Nhận thông báo khi có câu trả lời mới"
            />
            
            <FeatureCard
              icon="👥"
              title="Cộng đồng"
              description="Kết nối với những người có cùng sở thích"
            />
          </GridContainer>
          
          <FooterText>
            Acrylic Glass Effects - Blur background với colorful gradient animation
          </FooterText>
        </ContentWrapper>
      </HomeContainer>
    </div>
  );
}

export default HomePage; 