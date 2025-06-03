import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineUser, HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { acrylicButton, themeAwareText, colors } from '../../styles/theme';
import { 
  brandColors, 
  iconSizes, 
  avatarSizes, 
  spacing, 
  borderRadius,
  shadows,
  iconStyles,
  avatarStyles,
  hoverEffects,
  focusRing,
  themeColors
} from '../../styles/designSystem';
import { useTheme } from '../../hooks/useTheme';
import MenuIcon from './MenuIcon';

interface UserMenuProps {
  user?: {
    id: string;
    name: string;
    avatar?: string;
  };
  onLogin?: () => void;
  onLogout?: () => void;
}

const UserMenuContainer = styled.div`
  position: relative;
  display: inline-block;
  z-index: 100;
  isolation: isolate;
`;

const UserButtonWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`;

const UserAvatar = styled.img`
  ${avatarStyles.sm}
  object-fit: cover;
`;

const UserName = styled.span`
  ${themeAwareText}
  font-size: ${iconSizes.sm};
  font-weight: 500;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${themeColors.light.text.primary};
  
  .dark & {
    color: ${themeColors.dark.text.primary};
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const DropdownMenu = styled(motion.div)`
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid ${themeColors.light.border.primary};
  box-shadow: ${shadows.xl};
  
  .dark & {
    background: rgba(20, 20, 20, 0.98);
    border: 1px solid ${themeColors.dark.border.secondary};
    box-shadow: ${shadows['2xl']};
  }
  
  position: absolute;
  top: calc(100% + ${spacing.sm});
  right: 0;
  min-width: 220px;
  border-radius: ${borderRadius.xl};
  padding: ${spacing.md};
  z-index: 9999;
  overflow: hidden;
`;

const MenuItem = styled(motion.div).attrs({ as: Link })`
  ${themeAwareText}
  ${hoverEffects.slideRight}
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  padding: ${spacing.md} ${spacing.lg};
  border-radius: ${borderRadius.lg};
  text-decoration: none;
  font-size: ${iconSizes.sm};
  font-weight: 500;
  margin-bottom: ${spacing.xs};
  
  &:hover {
    background: ${brandColors.gradient.primaryLight};
    box-shadow: ${shadows.md};
  }
  
  .dark &:hover {
    background: ${brandColors.gradient.primaryLight};
    box-shadow: ${shadows.md};
  }
  
  svg {
    ${iconStyles.md}
    color: ${themeColors.light.text.secondary};
    transition: all 0.2s ease;
    
    .dark & {
      color: ${themeColors.dark.text.secondary};
    }
  }
  
  &:hover svg {
    color: ${brandColors.primary[500]};
    
    .dark & {
      color: ${brandColors.primary[400]};
    }
  }
`;

const MenuButton = styled(motion.button)`
  ${themeAwareText}
  ${hoverEffects.slideRight}
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  padding: ${spacing.md} ${spacing.lg};
  border-radius: ${borderRadius.lg};
  border: none;
  background: none;
  font-size: ${iconSizes.sm};
  font-weight: 500;
  width: 100%;
  cursor: pointer;
  margin-bottom: ${spacing.xs};
  
  &:hover {
    background: ${brandColors.gradient.primaryLight};
    box-shadow: ${shadows.md};
  }
  
  .dark &:hover {
    background: ${brandColors.gradient.primaryLight};
    box-shadow: ${shadows.md};
  }
  
  svg {
    ${iconStyles.md}
    color: ${themeColors.light.text.secondary};
    transition: all 0.2s ease;
    
    .dark & {
      color: ${themeColors.dark.text.secondary};
    }
  }
  
  &:hover svg {
    color: ${brandColors.primary[500]};
    
    .dark & {
      color: ${brandColors.primary[400]};
    }
  }
`;

const MenuDivider = styled.div`
  height: 1px;
  background: ${themeColors.light.border.divider};
  margin: ${spacing.sm} 0;
  
  .dark & {
    background: ${themeColors.dark.border.divider};
  }
`;

const ThemeMenuButton = styled(MenuButton)`
  color: ${themeColors.light.text.accent};
  
  .dark & {
    color: ${themeColors.dark.text.accent};
  }
  
  svg {
    color: ${brandColors.primary[500]} !important;
    
    .dark & {
      color: ${brandColors.primary[400]} !important;
    }
  }
`;

const dropdownVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95, 
    y: -10,
    transition: {
      duration: 0.2
    }
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 }
};

function UserMenu({ user, onLogin, onLogout }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = () => {
    setIsOpen(false);
  };

  const handleThemeToggle = () => {
    toggleTheme();
    setIsOpen(false);
  };

  const handleLogout = () => {
    onLogout?.();
    setIsOpen(false);
  };

  return (
    <UserMenuContainer ref={menuRef}>
      <MenuIcon
        onClick={handleToggleMenu}
        title={user ? `Menu của ${user.name}` : 'Menu người dùng'}
        autoWidth={true}
      >
        <UserButtonWrapper>
          {user ? (
            <>
              {user.avatar ? (
                <UserAvatar src={user.avatar} alt={user.name} />
              ) : (
                <HiOutlineUser />
              )}
              <UserName>{user.name}</UserName>
            </>
          ) : (
            <HiOutlineUser />
          )}
        </UserButtonWrapper>
      </MenuIcon>

      <AnimatePresence>
        {isOpen && (
          <DropdownMenu
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {user ? (
              <>
                <MenuItem 
                  to="/profile" 
                  onClick={handleMenuItemClick}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <HiOutlineUser />
                  Thông tin cá nhân
                </MenuItem>
                <MenuItem 
                  to="/settings" 
                  onClick={handleMenuItemClick}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  ⚙️ Cài đặt
                </MenuItem>
                <MenuDivider />
                <MenuButton 
                  onClick={handleLogout}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.15 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  🚪 Đăng xuất
                </MenuButton>
              </>
            ) : (
              <>
                <MenuItem 
                  to="/login" 
                  onClick={handleMenuItemClick}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  🚪 Đăng nhập
                </MenuItem>
                <MenuItem 
                  to="/register" 
                  onClick={handleMenuItemClick}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  📝 Đăng ký
                </MenuItem>
              </>
            )}
            
            <MenuDivider />
            
            <ThemeMenuButton 
              onClick={handleThemeToggle}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {theme === 'dark' ? (
                <>
                  <HiOutlineSun />
                  Chế độ sáng
                </>
              ) : (
                <>
                  <HiOutlineMoon />
                  Chế độ tối
                </>
              )}
            </ThemeMenuButton>
          </DropdownMenu>
        )}
      </AnimatePresence>
    </UserMenuContainer>
  );
}

export default UserMenu; 