import styled from 'styled-components';
import { Card } from './index';
import { themeAwareText } from '../../styles/theme';

// Props cho FeatureCard
interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  className?: string;
}

// Styled components cho feature card
const FeatureTitle = styled.h3`
  ${themeAwareText}
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

const FeatureDescription = styled.p`
  ${themeAwareText}
  font-size: 0.875rem;
  opacity: 0.8;
  line-height: 1.4;
  
  .dark & {
    opacity: 0.7;
  }
`;

// FeatureCard component
function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <Card className={className}>
      <FeatureTitle>
        {icon} {title}
      </FeatureTitle>
      <FeatureDescription>
        {description}
      </FeatureDescription>
    </Card>
  );
}

export default FeatureCard; 