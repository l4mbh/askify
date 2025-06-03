# ICON LIBRARY STANDARDIZATION - ASKIFY

## 🎯 Vấn đề ban đầu

Dự án đang sử dụng **MIX của nhiều thư viện icon khác nhau**:

### ❌ Trước khi chuẩn hóa:
```typescript
// NotificationDropdown - Mixed react-icons
import { IoNotifications } from 'react-icons/io5';
import { FiBell } from 'react-icons/fi';

// UserMenu - Heroicons  
import { UserIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';

// MainMenu - Heroicons
import { Bars3Icon } from '@heroicons/react/24/outline';

// NotificationsPage - Mixed
import { CheckIcon, FunnelIcon } from '@heroicons/react/24/outline';
```

**Vấn đề:**
- 🔄 Inconsistent styling giữa các icon libraries
- 📦 Bundle size lớn hơn do multiple libraries
- 🛠️ Khó maintain và update
- 🎨 Khó đảm bảo consistent visual design

## ✅ Giải pháp đã áp dụng

### **Chuẩn hóa 100% sử dụng `react-icons`**

**Lý do chọn react-icons:**
1. ✅ **Comprehensive**: Chứa nhiều icon sets (Heroicons, Feather, Material, etc.)
2. ✅ **Consistent API**: Tất cả icons đều có cùng props và behavior
3. ✅ **Tree-shakable**: Chỉ bundle những icons được sử dụng
4. ✅ **Flexible**: Dễ dàng thay đổi style và size
5. ✅ **Popular**: 12M+ downloads/week, community support tốt

### **Icon Sets được sử dụng:**

#### 1. Heroicons v2 (`react-icons/hi2`)
```typescript
import { 
  HiOutlineUser,      // User icon
  HiOutlineSun,       // Light theme
  HiOutlineMoon,      // Dark theme
  HiOutlineBars3,     // Menu hamburger
  HiOutlineCheck,     // Checkmark
  HiOutlineFunnel,    // Filter
  HiOutlineMagnifyingGlass, // Search
  HiOutlineEllipsisVertical // More options
} from 'react-icons/hi2';
```

#### 2. Ionicons v5 (`react-icons/io5`)
```typescript
import { 
  IoNotifications,        // Solid notification (unread)
  IoNotificationsOutline  // Outline notification (read)
} from 'react-icons/io5';
```

## 📝 Migration Summary

### NotificationDropdown.tsx
```diff
- import { IoNotifications } from 'react-icons/io5';
- import { FiBell } from 'react-icons/fi';
+ import { IoNotifications, IoNotificationsOutline } from 'react-icons/io5';

// Usage
- <FiBell />
+ <IoNotificationsOutline />
```

### UserMenu.tsx
```diff
- import { UserIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
+ import { HiOutlineUser, HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2';

// Usage
- <UserIcon />
+ <HiOutlineUser />
- <SunIcon />
+ <HiOutlineSun />
- <MoonIcon />
+ <HiOutlineMoon />
```

### MainMenu.tsx
```diff
- import { Bars3Icon } from '@heroicons/react/24/outline';
+ import { HiOutlineBars3 } from 'react-icons/hi2';

// Usage
- <Bars3Icon />
+ <HiOutlineBars3 />
```

### NotificationsPage/index.tsx
```diff
- import { CheckIcon, FunnelIcon, MagnifyingGlassIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
+ import { HiOutlineCheck, HiOutlineFunnel, HiOutlineMagnifyingGlass, HiOutlineEllipsisVertical } from 'react-icons/hi2';
```

## 🎨 Design System Integration

### Icon Component Wrapper
```typescript
// components/ui/Icon.tsx
import { Icon } from '../components/ui';

<Icon size="md">
  <HiOutlineUser />
</Icon>
```

### Standardized Sizes
```typescript
import { iconStyles } from '../styles/designSystem';

// SVG styling trong styled-components
svg {
  ${iconStyles.md}  // 20px - Standard size
  color: ${themeColors.light.text.primary};
}
```

## 📊 Benefits đạt được

### 1. **Bundle Size Optimization**
- ❌ Trước: `@heroicons/react` + multiple `react-icons` packages
- ✅ Sau: Chỉ `react-icons` với tree-shaking

### 2. **Consistent Visual Design**
- ❌ Trước: Mixed line weights và styles
- ✅ Sau: Unified Heroicons v2 style (24px outline)

### 3. **Developer Experience**
- ❌ Trước: Phải nhớ nhiều import sources
- ✅ Sau: Chỉ cần nhớ `react-icons/hi2` và `react-icons/io5`

### 4. **Maintenance**
- ❌ Trước: Update multiple packages
- ✅ Sau: Chỉ update `react-icons`

## 🛠️ Development Guidelines

### ✅ ĐÚNG - Sử dụng react-icons
```typescript
// Heroicons v2 cho general UI
import { HiOutlineUser, HiOutlineSettings } from 'react-icons/hi2';

// Ionicons cho specialized icons
import { IoNotifications, IoHeart } from 'react-icons/io5';

// Với Icon wrapper
<Icon size="md">
  <HiOutlineUser />
</Icon>
```

### ❌ SAI - Không mix libraries
```typescript
// Không làm thế này nữa
import { UserIcon } from '@heroicons/react/24/outline';
import { FiSettings } from 'react-icons/fi';
import { MdNotifications } from 'react-icons/md';
```

## 📦 Package Dependencies

### Có thể remove (nếu không dùng cho gì khác):
```json
{
  "dependencies": {
    "@heroicons/react": "^2.2.0"  // ← Có thể remove
  }
}
```

### Keep:
```json
{
  "dependencies": {
    "react-icons": "^5.5.0"  // ← Main icon library
  }
}
```

## 🔍 Icon Mapping Reference

| Component | Old Icon | New Icon | Library |
|-----------|----------|----------|---------|
| User | `UserIcon` | `HiOutlineUser` | hi2 |
| Sun | `SunIcon` | `HiOutlineSun` | hi2 |
| Moon | `MoonIcon` | `HiOutlineMoon` | hi2 |
| Menu | `Bars3Icon` | `HiOutlineBars3` | hi2 |
| Bell (outline) | `FiBell` | `IoNotificationsOutline` | io5 |
| Bell (solid) | `IoNotifications` | `IoNotifications` | io5 |
| Check | `CheckIcon` | `HiOutlineCheck` | hi2 |
| Filter | `FunnelIcon` | `HiOutlineFunnel` | hi2 |
| Search | `MagnifyingGlassIcon` | `HiOutlineMagnifyingGlass` | hi2 |
| More | `EllipsisVerticalIcon` | `HiOutlineEllipsisVertical` | hi2 |

---

## ✅ Status: COMPLETED

**🎉 Tất cả icons đã được chuẩn hóa sử dụng react-icons!**

- ✅ Consistent visual design
- ✅ Optimized bundle size  
- ✅ Better developer experience
- ✅ Easier maintenance
- ✅ Design system integration

**Next steps**: Monitor usage và consider removing `@heroicons/react` dependency nếu không còn sử dụng cho components khác. 