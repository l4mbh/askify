# Chuẩn Hoá Icon Menu - Menu Icon Standardization

## Vấn Đề Đã Giải Quyết

Trước đây, các icon trên menu có style hover khác nhau:

### NotificationDropdown
- **Hover Effect**: `transform: scale(1.1)` + `border-color: primary[300]`
- **Animation**: Framer Motion với `buttonVariants` riêng
- **Style**: Hardcoded trong `NotificationButton`

### UserMenu  
- **Hover Effect**: Chỉ dùng `acrylicButton` cơ bản
- **Animation**: Không có animation riêng
- **Style**: Styled component `UserButton` riêng biệt

## Giải Pháp: MenuIcon Component

### Tạo Component Chung
```typescript
// components/ui/MenuIcon.tsx
interface MenuIconProps {
  children: React.ReactNode;
  onClick?: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  autoWidth?: boolean; // Hỗ trợ width tự động cho nội dung phức tạp
}
```

### Style Hover Chuẩn Hoá
```scss
// Hover Effects được chuẩn hoá:
&:hover {
  border-color: ${brandColors.primary[300]};
  transform: translateY(-1px);
}

&:hover svg {
  color: ${brandColors.primary[500]};
  transform: scale(1.1);
}
```

### Animation Thống Nhất
```javascript
const buttonVariants = {
  idle: { y: 0, scale: 1 },
  hover: { 
    y: -1, 
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17
    }
  },
  tap: { scale: 0.95 }
};
```

## Cập Nhật Components

### NotificationDropdown
```typescript
// Trước:
<NotificationButton variants={buttonVariants} ...>
  <IoNotifications />
</NotificationButton>

// Sau:
<MenuIcon 
  onClick={handleToggle}
  title="Thông báo"
>
  <IoNotifications />
  <NotificationBadge>...</NotificationBadge>
</MenuIcon>
```

### UserMenu
```typescript
// Trước:
<UserButton onClick={handleToggleMenu}>
  <HiOutlineUser />
  <UserName>{user.name}</UserName>
</UserButton>

// Sau:
<MenuIcon
  onClick={handleToggleMenu}
  autoWidth={true}
  title="Menu người dùng"
>
  <UserButtonWrapper>
    <HiOutlineUser />
    <UserName>{user.name}</UserName>
  </UserButtonWrapper>
</MenuIcon>
```

## Tính Năng MenuIcon

### 1. Size Variants
- `sm`: 36px × 36px
- `md`: 40px × 40px (default)
- `lg`: 44px × 44px

### 2. Auto Width
- `autoWidth={false}`: Width cố định theo size
- `autoWidth={true}`: Min-width theo size + padding cho nội dung dài

### 3. Responsive Design
```scss
@media (max-width: 768px) {
  .user-name {
    display: none; // Ẩn text trên mobile
  }
}
```

### 4. Dark Mode Support
```scss
.dark & {
  &:hover {
    border-color: ${brandColors.primary[400]};
  }
  
  svg {
    color: ${themeColors.dark.text.primary};
  }
}
```

## Lợi Ích Đạt Được

### 1. **Consistency** 
- Tất cả icon menu có cùng hover effect
- Animation timing và easing thống nhất
- Color scheme đồng bộ

### 2. **Maintainability**
- Chỉ cần cập nhật 1 component thay vì nhiều file
- Dễ dàng thêm hover effects mới
- Centralized styling logic

### 3. **Flexibility**
- Hỗ trợ nhiều size khác nhau
- Auto-width cho content phức tạp
- Dễ dàng reuse cho icon mới

### 4. **Performance**
- Shared animation variants
- Optimized re-renders
- Consistent DOM structure

## Code Cleanup

### Removed Components
- `NotificationButton` (styled component)
- `UserButton` (styled component)
- Duplicate `buttonVariants` definitions

### Consolidated Imports
- Single source of truth cho menu icon styling
- Reduced bundle size do ít duplicate code

## Usage Guidelines

### Cho Icon Đơn Giản
```typescript
<MenuIcon onClick={handleClick} title="Action">
  <SomeIcon />
</MenuIcon>
```

### Cho Nội Dung Phức Tạp
```typescript
<MenuIcon autoWidth={true} onClick={handleClick}>
  <ComplexContent>
    <Avatar />
    <Text>Username</Text>
  </ComplexContent>
</MenuIcon>
```

### Accessibility
- Luôn cung cấp `title` prop cho screen readers
- Icon phải có semantic meaning
- Keyboard navigation support built-in

---

*Chuẩn hoá hoàn thành vào [UPDATE - 19/12] - Unified menu icon hover effects across all components* 