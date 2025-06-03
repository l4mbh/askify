import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IoNotifications, IoNotificationsOutline } from 'react-icons/io5';
import styled from 'styled-components';
import { acrylicButton, themeAwareText } from '../../styles/theme';
import { 
  brandColors, 
  iconSizes, 
  spacing, 
  borderRadius,
  shadows,
  iconStyles,
  hoverEffects,
  themeColors,
  semanticColors,
  avatarStyles,
  fontSize
} from '../../styles/designSystem';
import MenuIcon from './MenuIcon';

interface Notification {
  id: string;
  type: 'question' | 'answer' | 'like' | 'comment' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  link?: string;
  avatar?: string;
  userName?: string;
}

interface NotificationDropdownProps {
  notifications?: Notification[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
}

const NotificationContainer = styled.div`
  position: relative;
  display: inline-block;
  z-index: 100;
  isolation: isolate;
`;

const NotificationBadge = styled(motion.div)`
  position: absolute;
  top: -2px;
  right: -2px;
  background: ${semanticColors.error[500]};
  color: white;
  border-radius: ${borderRadius.full};
  min-width: ${spacing['2xl']};
  height: ${spacing['2xl']};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${iconSizes.xs};
  font-weight: 600;
  border: 2px solid white;
  box-shadow: ${shadows.sm};
  pointer-events: none;
  
  .dark & {
    border-color: #1f2937;
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
  width: 380px;
  max-height: 500px;
  border-radius: ${borderRadius.xl};
  overflow: hidden;
  z-index: 9999;
  
  @media (max-width: 480px) {
    width: 320px;
    right: -${spacing['2xl']};
  }
`;

const DropdownHeader = styled.div`
  padding: ${spacing['2xl']} ${spacing['3xl']} ${spacing.xl};
  border-bottom: 1px solid ${brandColors.primary[100]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${brandColors.gradient.primaryLight};
  
  .dark & {
    border-bottom-color: ${brandColors.primary[800]};
    background: ${brandColors.gradient.primaryLight};
  }
`;

const DropdownTitle = styled.h3`
  ${themeAwareText}
  font-size: ${iconSizes.lg};
  font-weight: 600;
  margin: 0;
`;

const MarkAllButton = styled(motion.button)`
  ${themeAwareText}
  ${hoverEffects.scaleSmall}
  background: none;
  border: none;
  font-size: ${iconSizes.sm};
  color: ${themeColors.light.text.accent};
  cursor: pointer;
  padding: ${spacing.xs} ${spacing.sm};
  border-radius: ${borderRadius.sm};
  
  &:hover {
    background: ${themeColors.light.background.hover};
  }
  
  .dark & {
    color: ${themeColors.dark.text.accent};
    
    &:hover {
      background: ${themeColors.dark.background.hover};
    }
  }
`;

const NotificationsList = styled.div`
  max-height: 320px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${brandColors.primary[200]};
    border-radius: ${borderRadius.sm};
  }
  
  .dark &::-webkit-scrollbar-thumb {
    background: ${brandColors.primary[700]};
  }
`;

const NotificationItem = styled(motion.div)<{ $isRead: boolean }>`
  padding: ${spacing.lg} ${spacing['2xl']};
  border-bottom: 1px solid ${brandColors.primary[50]};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${brandColors.gradient.primaryLight};
  }
  
  .dark & {
    border-bottom-color: ${brandColors.primary[900]};
    
    &:hover {
      background: ${brandColors.gradient.primaryLight};
    }
  }
  
  ${props => !props.$isRead && `
    background: ${brandColors.gradient.primaryLight};
    border-left: 4px solid ${brandColors.primary[500]};
    
    .dark & {
      background: ${brandColors.gradient.primaryLight};
      border-left-color: ${brandColors.primary[400]};
    }
  `}
`;

const NotificationContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${spacing.md};
  width: 100%;
`;

const NotificationAvatar = styled.div`
  ${iconStyles.lg}
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  img {
    ${avatarStyles.sm}
    object-fit: cover;
  }
  
  /* Emoji fallback styling */
  font-size: ${spacing.lg};
`;

const NotificationText = styled.div`
  flex: 1;
  min-width: 0;
`;

const NotificationTitle = styled.div`
  ${themeAwareText}
  font-size: ${fontSize.sm};
  font-weight: 600;
  margin-bottom: ${spacing.xs};
  line-height: 1.3;
`;

const NotificationMessage = styled.div`
  ${themeAwareText}
  font-size: ${fontSize.xs};
  opacity: 0.8;
  line-height: 1.4;
  margin-bottom: ${spacing.xs};
`;

const NotificationTime = styled.div`
  ${themeAwareText}
  font-size: ${fontSize.xs};
  opacity: 0.6;
`;

const NotificationDot = styled.div<{ $isRead: boolean }>`
  width: ${spacing.sm};
  height: ${spacing.sm};
  border-radius: ${borderRadius.full};
  background: ${brandColors.primary[500]};
  display: ${props => props.$isRead ? 'none' : 'block'};
  flex-shrink: 0;
  margin-top: ${spacing.xs};
`;

const DropdownFooter = styled.div`
  padding: ${spacing.lg} ${spacing['2xl']};
  border-top: 1px solid ${brandColors.primary[100]};
  background: ${brandColors.gradient.primaryLight};
  
  .dark & {
    border-top-color: ${brandColors.primary[800]};
    background: ${brandColors.gradient.primaryLight};
  }
`;

const ViewAllButton = styled(Link)`
  ${acrylicButton}
  ${hoverEffects.lift}
  display: block;
  text-align: center;
  text-decoration: none;
  padding: ${spacing.lg} ${spacing.xl};
  border-radius: ${borderRadius.lg};
  font-size: ${fontSize.sm};
  font-weight: 600;
  ${themeAwareText}
  background: ${brandColors.gradient.primaryLight};
  border: 1px solid ${brandColors.primary[200]};
  
  &:hover {
    box-shadow: ${shadows.brand};
    background: ${brandColors.gradient.primaryMedium};
  }
  
  .dark & {
    background: ${brandColors.gradient.primaryLight};
    border-color: ${brandColors.primary[700]};
    
    &:hover {
      background: ${brandColors.gradient.primaryMedium};
      box-shadow: ${shadows.brand};
    }
  }
`;

const EmptyState = styled.div`
  padding: ${spacing['4xl']} ${spacing['2xl']};
  text-align: center;
  ${themeAwareText}
  opacity: 0.6;
  
  .empty-icon {
    font-size: ${spacing['3xl']};
    margin-bottom: ${spacing.md};
  }
`;

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'question',
    title: 'Câu hỏi mới',
    message: 'Có ai biết cách tối ưu React hooks không?',
    timestamp: '2 phút trước',
    isRead: false,
    avatar: '/avatars/user1.jpg',
    userName: 'Nguyễn Văn A'
  },
  {
    id: '2',
    type: 'answer',
    title: 'Câu trả lời mới',
    message: 'Câu hỏi của bạn đã được trả lời',
    timestamp: '5 phút trước',
    isRead: false,
    avatar: '/avatars/user2.jpg',
    userName: 'Trần Thị B'
  },
  {
    id: '3',
    type: 'like',
    title: 'Lượt thích',
    message: 'Câu trả lời của bạn được thích',
    timestamp: '10 phút trước',
    isRead: true,
    avatar: '/avatars/user3.jpg',
    userName: 'Lê Văn C'
  }
];

const badgeVariants = {
  initial: { scale: 0 },
  animate: { 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 25
    }
  },
  pulse: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      repeatDelay: 2
    }
  }
};

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
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

function NotificationDropdown({ 
  notifications = mockNotifications, 
  onMarkAsRead, 
  onMarkAllAsRead 
}: NotificationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (notification: Notification) => {
    if (!notification.isRead && onMarkAsRead) {
      onMarkAsRead(notification.id);
    }
    setIsOpen(false);
  };

  const handleMarkAllAsRead = () => {
    if (onMarkAllAsRead) {
      onMarkAllAsRead();
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'answer': return '💬';
      case 'like': return '❤️';
      case 'comment': return '💭';
      case 'question': return '❓';
      case 'system': return '🎉';
      default: return '🔔';
    }
  };

  return (
    <NotificationContainer ref={menuRef}>
      <MenuIcon
        onClick={handleToggle}
        title={`Thông báo${unreadCount > 0 ? ` (${unreadCount} chưa đọc)` : ''}`}
      >
        {unreadCount > 0 ? (
          <IoNotifications />
        ) : (
          <IoNotificationsOutline />
        )}
        {unreadCount > 0 && (
          <NotificationBadge
            variants={badgeVariants}
            initial="initial"
            animate={unreadCount > 0 ? "pulse" : "animate"}
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </NotificationBadge>
        )}
      </MenuIcon>

      <AnimatePresence>
        {isOpen && (
          <DropdownMenu
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <DropdownHeader>
              <DropdownTitle>Thông báo</DropdownTitle>
              {unreadCount > 0 && (
                <MarkAllButton
                  onClick={handleMarkAllAsRead}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Đánh dấu tất cả đã đọc
                </MarkAllButton>
              )}
            </DropdownHeader>

            <NotificationsList>
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <NotificationItem
                    key={notification.id}
                    $isRead={notification.isRead}
                    onClick={() => handleItemClick(notification)}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 4 }}
                  >
                    <NotificationContent>
                      <NotificationAvatar>
                        {notification.avatar ? (
                          <img src={notification.avatar} alt={notification.userName} />
                        ) : (
                          getNotificationIcon(notification.type)
                        )}
                      </NotificationAvatar>
                      
                      <NotificationText>
                        <NotificationTitle>{notification.title}</NotificationTitle>
                        <NotificationMessage>{notification.message}</NotificationMessage>
                        <NotificationTime>{notification.timestamp}</NotificationTime>
                      </NotificationText>
                      
                      <NotificationDot $isRead={notification.isRead} />
                    </NotificationContent>
                  </NotificationItem>
                ))
              ) : (
                <EmptyState>
                  <div className="empty-icon">🔔</div>
                  <div>Chưa có thông báo nào</div>
                </EmptyState>
              )}
            </NotificationsList>

            <DropdownFooter>
              <ViewAllButton 
                to="/notifications" 
                onClick={() => setIsOpen(false)}
              >
                Xem tất cả thông báo
              </ViewAllButton>
            </DropdownFooter>
          </DropdownMenu>
        )}
      </AnimatePresence>
    </NotificationContainer>
  );
}

export default NotificationDropdown; 