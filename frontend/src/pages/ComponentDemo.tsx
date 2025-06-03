import React from 'react';
import styled from 'styled-components';
import { themeAwareText } from '../styles/theme';
import { 
  Card, 
  FeatureCard, 
  ThemeButton, 
  Divider, 
  LoadingSpinner,
  UserMenu
} from '../components/ui';
import { useAuth } from '../hooks/useAuth';
import { AcrylicContainer, AcrylicButton, AcrylicInput } from '../components/shared';

const DemoContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
`;

const DemoSection = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  ${themeAwareText}
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 20px;
`;

const DemoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const DemoRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const LoginDemo = styled(Card)`
  padding: 20px;
  text-align: center;
`;

const LoginButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  margin: 5px;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

// Trang demo để test shared components
function ComponentDemo() {
  const { user, login, logout, isLoading } = useAuth();

  const handleDemoLogin = async () => {
    await login('demo@example.com', 'password');
  };

  const handleDemoLogout = () => {
    logout();
  };

  return (
    <DemoContainer>
      <SectionTitle>Component Demo</SectionTitle>
      
      <DemoSection>
        <SectionTitle>Authentication Demo</SectionTitle>
        <LoginDemo>
          <h3>User Authentication Status</h3>
          <p>Status: {user ? `Logged in as ${user.name}` : 'Not logged in'}</p>
          <p>Loading: {isLoading ? 'Yes' : 'No'}</p>
          
          <div style={{ margin: '20px 0' }}>
            <UserMenu 
              user={user || undefined}
              onLogout={handleDemoLogout}
            />
          </div>
          
          <div>
            <LoginButton onClick={handleDemoLogin} disabled={isLoading}>
              Demo Login
            </LoginButton>
            <LoginButton onClick={handleDemoLogout} disabled={isLoading}>
              Demo Logout
            </LoginButton>
          </div>
        </LoginDemo>
      </DemoSection>

      <DemoSection>
        <SectionTitle>Loading Spinners</SectionTitle>
        <DemoGrid>
          <Card style={{ padding: '20px', textAlign: 'center' }}>
            <h3>Spinner</h3>
            <LoadingSpinner variant="spinner" size="md" />
          </Card>
          <Card style={{ padding: '20px', textAlign: 'center' }}>
            <h3>Dots</h3>
            <LoadingSpinner variant="dots" size="md" />
          </Card>
          <Card style={{ padding: '20px', textAlign: 'center' }}>
            <h3>Pulse</h3>
            <LoadingSpinner variant="pulse" size="md" />
          </Card>
          <Card style={{ padding: '20px', textAlign: 'center' }}>
            <h3>Bounce</h3>
            <LoadingSpinner variant="bounce" size="md" />
          </Card>
        </DemoGrid>
      </DemoSection>

      <DemoSection>
        <SectionTitle>Cards</SectionTitle>
        <DemoGrid>
          <Card style={{ padding: '20px' }}>
            <h3>Basic Card</h3>
            <p>This is a basic card component with acrylic background effect.</p>
          </Card>
          <FeatureCard
            title="Feature Card"
            description="This is a feature card with enhanced styling."
            icon="🎨"
          />
        </DemoGrid>
      </DemoSection>

      <DemoSection>
        <SectionTitle>Other Components</SectionTitle>
        <DemoRow>
          <ThemeButton onClick={() => {}}>Theme Button</ThemeButton>
          <Divider />
          <span>Divider Demo</span>
        </DemoRow>
      </DemoSection>

      <DemoSection>
        <SectionTitle>AcrylicContainer Demo</SectionTitle>
        <AcrylicContainer padding="lg" maxWidth="800px">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Shared Components Demo
          </h1>
          
          {/* Button Variants */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">AcrylicButton Variants</h2>
            <div className="flex flex-wrap gap-3">
              <AcrylicButton variant="primary" size="sm">
                Primary Small
              </AcrylicButton>
              <AcrylicButton variant="primary" size="md">
                Primary Medium
              </AcrylicButton>
              <AcrylicButton variant="primary" size="lg">
                Primary Large
              </AcrylicButton>
            </div>
            
            <div className="flex flex-wrap gap-3 mt-3">
              <AcrylicButton variant="success">
                Success Button
              </AcrylicButton>
              <AcrylicButton variant="secondary">
                Secondary Button
              </AcrylicButton>
            </div>
            
            <div className="mt-3">
              <AcrylicButton variant="primary" fullWidth>
                Full Width Button
              </AcrylicButton>
            </div>
          </div>
          
          {/* Input Demo */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">AcrylicInput Demo</h2>
            <div className="space-y-3">
              <AcrylicInput 
                type="text" 
                placeholder="Text Input" 
              />
              <AcrylicInput 
                type="email" 
                placeholder="Email Input" 
              />
              <AcrylicInput 
                type="password" 
                placeholder="Password Input" 
              />
              <AcrylicInput 
                type="text" 
                placeholder="Disabled Input" 
                disabled 
              />
            </div>
          </div>
        </AcrylicContainer>
      </DemoSection>

      <DemoSection>
        <SectionTitle>Different Container Sizes</SectionTitle>
        <div className="flex flex-wrap gap-4">
          <AcrylicContainer padding="sm" maxWidth="200px">
            <h3 className="font-semibold mb-2">Small Container</h3>
            <p>Padding: sm</p>
          </AcrylicContainer>
          
          <AcrylicContainer padding="md" maxWidth="250px">
            <h3 className="font-semibold mb-2">Medium Container</h3>
            <p>Padding: md</p>
          </AcrylicContainer>
          
          <AcrylicContainer padding="lg" maxWidth="300px">
            <h3 className="font-semibold mb-2">Large Container</h3>
            <p>Padding: lg</p>
          </AcrylicContainer>
        </div>
      </DemoSection>
    </DemoContainer>
  );
}

export default ComponentDemo; 