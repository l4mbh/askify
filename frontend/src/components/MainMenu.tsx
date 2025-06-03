// Main menu cho ứng dụng Q&A
import { useState, useEffect } from 'react';
import { HiOutlineBars3 } from 'react-icons/hi2';
import styled from 'styled-components';
import { acrylicBase } from '../styles/theme';
import { MenuLink, Divider, UserMenu } from './ui';
import { useAuth } from '../hooks/useAuth';
import NotificationDropdown from './ui/NotificationDropdown';
import { 
  brandColors, 
  borderRadius,
  iconStyles,
  hoverEffects,
  themeColors
} from '../styles/designSystem';

// Styled containers với parent-level styles
const MenuContainer = styled.div<{ $isScrolled: boolean }>`
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  transition: all 0.3s ease;
  
  ${props => props.$isScrolled && `
    background: rgba(255, 255, 255, 0.05);
    
    .dark & {
      background: rgba(0, 0, 0, 0.1);
    }
  `}
`;

const MenuNav = styled.nav<{ $isScrolled: boolean }>`
  ${acrylicBase}
  
  margin: ${props => props.$isScrolled ? '0.5rem 1rem' : '1rem'};
  height: ${props => props.$isScrolled ? '3.5rem' : '4rem'};
  border-radius: 1rem;
  max-width: 112rem; /* max-w-7xl */
  margin-left: auto;
  margin-right: auto;
  
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  transition: all 0.3s ease;
  
  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }
`;

const DesktopMenu = styled.div`
  display: none;
  align-items: center;
  gap: 1.5rem;
  
  @media (min-width: 1024px) {
    display: flex;
  }
`;

const MobileMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  @media (min-width: 1024px) {
    display: none;
  }
`;

const MobileDropdown = styled.div`
  ${acrylicBase}
  margin: 0 1rem 0.5rem;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  
  @media (min-width: 1024px) {
    display: none;
  }
  
  > * + * {
    margin-top: 0.5rem;
  }
`;

const LogoLink = styled(MenuLink)`
  font-size: 1.25rem;
  font-weight: bold;
`;

const MobileMenuButton = styled.button`
  ${hoverEffects.lift}
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: ${brandColors.gradient.primaryLight};
  border-radius: ${borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${brandColors.gradient.primaryMedium};
  }
  
  .dark & {
    background: ${brandColors.gradient.primaryLight};
    
    &:hover {
      background: ${brandColors.gradient.primaryMedium};
    }
  }
  
  svg {
    ${iconStyles.md}
    color: ${themeColors.light.text.primary};
    
    .dark & {
      color: ${themeColors.dark.text.primary};
    }
  }
`;

// Menu chính với shared components
function MainMenu() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  // Track scroll để thêm sticky effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <MenuContainer $isScrolled={isScrolled}>
      <MenuNav $isScrolled={isScrolled}>
        {/* Logo */}
        <LogoLink to="/">Askify</LogoLink>

        {/* Desktop Navigation */}
        <DesktopMenu>
          <MenuLink to="/">Trang chủ</MenuLink>
          <MenuLink to="/feeds">Khám phá</MenuLink>
          <MenuLink to="/question/1">Câu hỏi</MenuLink>
          <MenuLink to="/leaderboard">Bảng xếp hạng</MenuLink>
          <MenuLink to="/demo">Demo</MenuLink>
          <MenuLink to="/loading">Loading</MenuLink>
          <MenuLink to="/error/404">Error</MenuLink>
          
          <Divider />
          
          <NotificationDropdown />
          
          <UserMenu 
            user={user || undefined}
            onLogout={handleLogout}
          />
        </DesktopMenu>

        {/* Mobile Navigation */}
        <MobileMenu>
          <MenuLink to="/">Home</MenuLink>
          
          <NotificationDropdown />
          
          <UserMenu 
            user={user || undefined}
            onLogout={handleLogout}
          />

          <MobileMenuButton
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <HiOutlineBars3 />
          </MobileMenuButton>
        </MobileMenu>
      </MenuNav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <MobileDropdown>
          <MenuLink 
            to="/feeds" 
            className="block py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Khám phá
          </MenuLink>
          <MenuLink 
            to="/question/1" 
            className="block py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Câu hỏi
          </MenuLink>
          <MenuLink 
            to="/notifications" 
            className="block py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Thông báo
          </MenuLink>
          <MenuLink 
            to="/leaderboard" 
            className="block py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Bảng xếp hạng
          </MenuLink>
          <MenuLink 
            to="/demo" 
            className="block py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Demo
          </MenuLink>
          <MenuLink 
            to="/loading" 
            className="block py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Loading
          </MenuLink>
          <MenuLink 
            to="/error/404" 
            className="block py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Error
          </MenuLink>
        </MobileDropdown>
      )}
    </MenuContainer>
  );
}

export default MainMenu; 