import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { themeAwareText, themeAwareTextHover } from '../../styles/theme';

// Props cho MenuLink
interface MenuLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

// Styled MenuLink với theme-aware styles
const StyledMenuLink = styled(Link)`
  ${themeAwareText}
  ${themeAwareTextHover}
  
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
`;

// MenuLink component
function MenuLink({ to, children, className, onClick }: MenuLinkProps) {
  return (
    <StyledMenuLink to={to} className={className} onClick={onClick}>
      {children}
    </StyledMenuLink>
  );
}

export default MenuLink; 