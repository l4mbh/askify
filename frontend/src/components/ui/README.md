# UI Components Guide

## Tổng quan

Tất cả UI components đã được thiết kế với **theme-aware styles** để hỗ trợ cả light và dark theme. Luôn sử dụng các components này thay vì Tailwind classes trực tiếp cho acrylic effects và text styling.

## Components có sẵn

### 1. Card

Acrylic card container cơ bản với theme-aware styling.

```tsx
import { Card } from '../components/ui';

<Card padding="md">
  <h3>Tiêu đề card</h3>
  <p>Nội dung card</p>
</Card>
```

**Props:**
- `padding`: 'sm' | 'md' | 'lg' - Kích thước padding
- `className`: string - Class CSS tùy chỉnh
- `children`: ReactNode - Nội dung bên trong

### 2. FeatureCard

Card chuyên dụng cho hiển thị tính năng với icon, tiêu đề và mô tả.

```tsx
import { FeatureCard } from '../components/ui';

<FeatureCard
  icon="🔍"
  title="Tìm kiếm thông minh"
  description="Tìm kiếm câu hỏi và câu trả lời theo tags và chủ đề"
/>
```

**Props:**
- `icon`: string - Icon emoji hoặc text
- `title`: string - Tiêu đề tính năng
- `description`: string - Mô tả chi tiết
- `className`: string - Class CSS tùy chỉnh

### 3. ThemeButton

Button với acrylic effects và theme-aware styling.

```tsx
import { ThemeButton } from '../components/ui';

<ThemeButton size="md" onClick={handleClick}>
  Click me
</ThemeButton>
```

**Props:**
- `size`: 'sm' | 'md' | 'lg' - Kích thước button
- `onClick`: function - Handler cho click event
- `className`: string - Class CSS tùy chỉnh

### 4. MenuLink

Link với theme-aware text styling cho navigation.

```tsx
import { MenuLink } from '../components/ui';

<MenuLink to="/home">Trang chủ</MenuLink>
```

### 5. Divider

Đường phân cách với theme-aware colors.

```tsx
import { Divider } from '../components/ui';

<Divider orientation="vertical" size="md" />
```

## Theme System

### Colors

Sử dụng `colors` object từ `styles/theme.ts`:

```tsx
import { colors } from '../styles/theme';

// Sử dụng colors.light.text.primary cho light theme
// colors.dark.text.primary cho dark theme
```

### Text Styling

Sử dụng `themeAwareText` mixin cho text có theme-aware:

```tsx
import styled from 'styled-components';
import { themeAwareText } from '../styles/theme';

const MyText = styled.p`
  ${themeAwareText}
  font-size: 1rem;
`;
```

### Acrylic Effects

Sử dụng `acrylicBase` cho container và `acrylicButton` cho interactive elements:

```tsx
import styled from 'styled-components';
import { acrylicBase, acrylicButton } from '../styles/theme';

const MyContainer = styled.div`
  ${acrylicBase}
  padding: 1rem;
`;

const MyButton = styled.button`
  ${acrylicButton}
  padding: 0.5rem 1rem;
`;
```

## Best Practices

### ✅ Nên làm

1. **Luôn sử dụng UI components** thay vì Tailwind classes cho acrylic effects
2. **Sử dụng theme-aware mixins** cho text và backgrounds
3. **Tạo styled components mới** nếu cần customization
4. **Import từ `components/ui`** để dễ quản lý

```tsx
// ✅ Good
import { Card, FeatureCard } from '../components/ui';

<Card>
  <FeatureCard icon="🎯" title="Feature" description="Description" />
</Card>
```

### ❌ Không nên làm

1. **Không dùng Tailwind classes** cho acrylic effects
2. **Không hardcode colors** mà hãy dùng theme system
3. **Không tạo duplicate styling** 

```tsx
// ❌ Bad
<div className="bg-white bg-opacity-10 backdrop-blur-sm border border-white">
  <h3 className="font-semibold text-black dark:text-white">Title</h3>
</div>

// ✅ Good
<Card>
  <h3>Title</h3>
</Card>
```

## Extending Components

Khi cần tạo components mới, hãy:

1. Extend từ existing components
2. Sử dụng theme mixins
3. Export trong `index.ts`
4. Cập nhật README này

```tsx
// Ví dụ: ProductCard extends Card
import styled from 'styled-components';
import { Card } from './Card';
import { themeAwareText } from '../../styles/theme';

const ProductCard = styled(Card)`
  ${themeAwareText}
  min-height: 200px;
  
  &:hover {
    transform: translateY(-4px);
  }
`;

export default ProductCard;
``` 