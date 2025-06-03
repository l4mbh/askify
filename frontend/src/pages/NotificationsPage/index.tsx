import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineCheck, 
  HiOutlineFunnel,
  HiOutlineMagnifyingGlass,
  HiOutlineEllipsisVertical
} from 'react-icons/hi2';
import { IoNotifications } from 'react-icons/io5';
import styled from 'styled-components';
import { acrylicBase, acrylicButton, themeAwareText } from '../../styles/theme';
import { StaggerContainer, StaggerItem } from '../../components/ui';
import PageTransition from '../../components/ui/PageTransition';

// Types
interface Notification {
  id: string;
  type: 'question' | 'answer' | 'like' | 'comment' | 'system' | 'follow';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  link?: string;
  avatar?: string;
  userName?: string;
  actionData?: Record<string, unknown>;
}

type FilterType = 'all' | 'unread' | 'question' | 'answer' | 'like' | 'comment' | 'system' | 'follow';

// Styled Components
const PageContainer = styled(motion.div)`
  min-height: 100vh;
  padding: 2rem 1rem;
  
  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;

const ContentContainer = styled.div`
  max-width: 4xl;
  margin: 0 auto;
`;

const Header = styled(motion.div)`
  ${acrylicBase}
  padding: 2rem;
  border-radius: 20px;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23667eea" fill-opacity="0.05"><pattern id="polka-dots" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse"><circle cx="30" cy="30" r="1.5"/></pattern><rect width="100%" height="100%" fill="url(%23polka-dots)"/></g></g></svg>');
    z-index: 0;
  }
  
  > * {
    position: relative;
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const Title = styled.h1`
  ${themeAwareText}
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  ${themeAwareText}
  opacity: 0.7;
  font-size: 1.1rem;
  margin: 0;
`;

const Controls = styled(motion.div)`
  ${acrylicBase}
  padding: 1.5rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;
`;

const SearchInput = styled.input`
  ${acrylicButton}
  width: 100%;
  padding: 12px 16px 12px 44px;
  border-radius: 12px;
  border: none;
  font-size: 0.9rem;
  ${themeAwareText}
  
  &::placeholder {
    opacity: 0.6;
  }
  
  &:focus {
    outline: none;
    transform: translateY(-1px);
    box-shadow: 0 8px 30px rgba(102, 126, 234, 0.15);
  }
`;

const SearchIcon = styled(HiOutlineMagnifyingGlass)`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  ${themeAwareText}
  opacity: 0.6;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
`;

const FilterButton = styled(motion.button)<{ $isActive: boolean }>`
  ${acrylicButton}
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  ${themeAwareText}
  
  ${props => props.$isActive && `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    
    .dark & {
      background: linear-gradient(135deg, #818cf8 0%, #a855f7 100%);
    }
  `}
  
  &:hover {
    transform: translateY(-1px);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const ActionButton = styled(motion.button)`
  ${acrylicButton}
  padding: 10px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  ${themeAwareText}
  
  &:hover {
    transform: translateY(-1px);
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const NotificationsList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NotificationCard = styled(motion.div)<{ $isRead: boolean }>`
  ${acrylicBase}
  padding: 1.5rem;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: ${props => props.$isRead ? 0.8 : 1};
  position: relative;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
    
    .dark & {
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: ${props => props.$isRead ? 'transparent' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
    border-radius: 0 0 0 16px;
  }
`;

const NotificationHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const NotificationAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const NotificationContent = styled.div`
  flex: 1;
`;

const NotificationTitle = styled.h3`
  ${themeAwareText}
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
`;

const NotificationMessage = styled.p`
  ${themeAwareText}
  font-size: 0.9rem;
  opacity: 0.8;
  line-height: 1.5;
  margin: 0 0 0.5rem 0;
`;

const NotificationMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.75rem;
`;

const NotificationTime = styled.span`
  ${themeAwareText}
  font-size: 0.8rem;
  opacity: 0.6;
`;

const NotificationActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const NotificationAction = styled(motion.button)`
  ${acrylicButton}
  padding: 6px 12px;
  border-radius: 8px;
  border: none;
  font-size: 0.75rem;
  cursor: pointer;
  ${themeAwareText}
  
  &:hover {
    transform: translateY(-1px);
  }
`;

const EmptyState = styled(motion.div)`
  ${acrylicBase}
  padding: 4rem 2rem;
  border-radius: 20px;
  text-align: center;
  
  .icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }
  
  .title {
    ${themeAwareText}
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .description {
    ${themeAwareText}
    opacity: 0.7;
    font-size: 1rem;
  }
`;

const Stats = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1rem;
`;

const StatItem = styled.div`
  text-align: center;
  
  .number {
    ${themeAwareText}
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
  }
  
  .label {
    ${themeAwareText}
    font-size: 0.8rem;
    opacity: 0.7;
  }
`;

// Mock data mở rộng
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'answer',
    title: 'Câu trả lời mới cho câu hỏi của bạn',
    message: 'Nguyễn Văn A đã trả lời câu hỏi "Làm thế nào để học React hiệu quả?" của bạn. Câu trả lời rất chi tiết và hữu ích.',
    timestamp: '2 phút trước',
    isRead: false,
    link: '/question/1',
    avatar: 'https://i.pravatar.cc/48?img=1',
    userName: 'Nguyễn Văn A'
  },
  {
    id: '2',
    type: 'like',
    title: 'Câu trả lời của bạn được yêu thích',
    message: 'Trần Thị B và 4 người khác đã thích câu trả lời của bạn về "useState trong React".',
    timestamp: '15 phút trước',
    isRead: false,
    link: '/question/2',
    avatar: 'https://i.pravatar.cc/48?img=2',
    userName: 'Trần Thị B'
  },
  {
    id: '3',
    type: 'comment',
    title: 'Bình luận mới',
    message: 'Lê Văn C đã bình luận về câu trả lời của bạn: "Cảm ơn bạn, giải thích rất rõ ràng!"',
    timestamp: '1 giờ trước',
    isRead: true,
    link: '/question/3',
    avatar: 'https://i.pravatar.cc/48?img=3',
    userName: 'Lê Văn C'
  },
  {
    id: '4',
    type: 'system',
    title: 'Chúc mừng! Bạn đã đạt cột mốc mới',
    message: 'Bạn đã đạt được 100 điểm danh tiếng và mở khóa huy hiệu "Người trả lời tích cực".',
    timestamp: '2 giờ trước',
    isRead: true,
    link: '/profile'
  },
  {
    id: '5',
    type: 'question',
    title: 'Câu hỏi mới trong chủ đề quan tâm',
    message: 'Phạm Thị D đã đặt câu hỏi mới về "Next.js 13 App Router" trong tag JavaScript.',
    timestamp: '3 giờ trước',
    isRead: true,
    link: '/question/4',
    avatar: 'https://i.pravatar.cc/48?img=4',
    userName: 'Phạm Thị D'
  },
  {
    id: '6',
    type: 'follow',
    title: 'Người theo dõi mới',
    message: 'Hoàng Văn E đã bắt đầu theo dõi bạn. Họ có 50+ câu hỏi và câu trả lời chất lượng.',
    timestamp: '1 ngày trước',
    isRead: true,
    link: '/profile/hoang-van-e',
    avatar: 'https://i.pravatar.cc/48?img=5',
    userName: 'Hoàng Văn E'
  }
];

const filterOptions = [
  { key: 'all', label: 'Tất cả', icon: '📋' },
  { key: 'unread', label: 'Chưa đọc', icon: '🔴' },
  { key: 'question', label: 'Câu hỏi', icon: '❓' },
  { key: 'answer', label: 'Câu trả lời', icon: '💬' },
  { key: 'like', label: 'Lượt thích', icon: '❤️' },
  { key: 'comment', label: 'Bình luận', icon: '💭' },
  { key: 'follow', label: 'Theo dõi', icon: '👥' },
  { key: 'system', label: 'Hệ thống', icon: '🔔' }
];

function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotifications = useMemo(() => {
    let filtered = notifications;

    // Filter by type
    if (activeFilter === 'unread') {
      filtered = filtered.filter(n => !n.isRead);
    } else if (activeFilter !== 'all') {
      filtered = filtered.filter(n => n.type === activeFilter);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(n => 
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.userName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [notifications, activeFilter, searchQuery]);

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const totalCount = notifications.length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, isRead: true }))
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'answer': return '💬';
      case 'like': return '❤️';
      case 'comment': return '💭';
      case 'question': return '❓';
      case 'system': return '🎉';
      case 'follow': return '👥';
      default: return '🔔';
    }
  };

  return (
    <PageTransition direction="up">
      <PageContainer>
        <ContentContainer>
          <Header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Title>
              <IoNotifications />
              Thông báo
            </Title>
            <Subtitle>Theo dõi tất cả hoạt động và cập nhật mới nhất</Subtitle>
            
            <Stats>
              <StatItem>
                <div className="number">{totalCount}</div>
                <div className="label">Tổng cộng</div>
              </StatItem>
              <StatItem>
                <div className="number">{unreadCount}</div>
                <div className="label">Chưa đọc</div>
              </StatItem>
              <StatItem>
                <div className="number">{totalCount - unreadCount}</div>
                <div className="label">Đã đọc</div>
              </StatItem>
            </Stats>
          </Header>

          <Controls
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <SearchContainer>
              <SearchIcon />
              <SearchInput
                type="text"
                placeholder="Tìm kiếm thông báo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchContainer>

            <FilterContainer>
              {filterOptions.map((option) => (
                <FilterButton
                  key={option.key}
                  $isActive={activeFilter === option.key}
                  onClick={() => setActiveFilter(option.key as FilterType)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {option.icon} {option.label}
                </FilterButton>
              ))}
            </FilterContainer>

            <ActionButtons>
              {unreadCount > 0 && (
                <ActionButton
                  onClick={handleMarkAllAsRead}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Đánh dấu tất cả đã đọc"
                >
                  <HiOutlineCheck />
                </ActionButton>
              )}
              
              <ActionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Bộ lọc nâng cao"
              >
                <HiOutlineFunnel />
              </ActionButton>
              
              <ActionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Tùy chọn khác"
              >
                <HiOutlineEllipsisVertical />
              </ActionButton>
            </ActionButtons>
          </Controls>

          <AnimatePresence mode="wait">
            {filteredNotifications.length > 0 ? (
              <StaggerContainer>
                <NotificationsList>
                  {filteredNotifications.map((notification, index) => (
                    <StaggerItem key={notification.id} index={index}>
                      <NotificationCard
                        $isRead={notification.isRead}
                        onClick={() => handleMarkAsRead(notification.id)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <NotificationHeader>
                          <NotificationAvatar>
                            {notification.avatar ? (
                              <img src={notification.avatar} alt={notification.userName} />
                            ) : (
                              getNotificationIcon(notification.type)
                            )}
                          </NotificationAvatar>
                          
                          <NotificationContent>
                            <NotificationTitle>{notification.title}</NotificationTitle>
                            <NotificationMessage>{notification.message}</NotificationMessage>
                          </NotificationContent>
                        </NotificationHeader>
                        
                        <NotificationMeta>
                          <NotificationTime>{notification.timestamp}</NotificationTime>
                          
                          <NotificationActions>
                            {!notification.isRead && (
                              <NotificationAction
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMarkAsRead(notification.id);
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Đánh dấu đã đọc
                              </NotificationAction>
                            )}
                            
                            <NotificationAction
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Xem chi tiết
                            </NotificationAction>
                          </NotificationActions>
                        </NotificationMeta>
                      </NotificationCard>
                    </StaggerItem>
                  ))}
                </NotificationsList>
              </StaggerContainer>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <EmptyState>
                  <div className="icon">🔍</div>
                  <div className="title">
                    {searchQuery ? 'Không tìm thấy kết quả' : 'Chưa có thông báo'}
                  </div>
                  <div className="description">
                    {searchQuery 
                      ? `Không có thông báo nào khớp với "${searchQuery}"`
                      : 'Thông báo sẽ xuất hiện ở đây khi có hoạt động mới'
                    }
                  </div>
                </EmptyState>
              </motion.div>
            )}
          </AnimatePresence>
        </ContentContainer>
      </PageContainer>
    </PageTransition>
  );
}

export default NotificationsPage; 