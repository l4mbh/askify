# ASKIFY DESIGN SYSTEM

## 🎨 Mục đích

Design System này được tạo ra để đảm bảo tính nhất quán trong thiết kế UI/UX trên toàn bộ ứng dụng Askify. Tất cả các component phải sử dụng các token từ design system thay vì hardcode values.

## 📋 Cấu trúc Design System

### 1. Brand Colors
```typescript
import { brandColors } from './designSystem';

// Primary brand palette
brandColors.primary[500] // #667eea - Main brand color
brandColors.primary[400] // #8b94f7 - Lighter variant
brandColors.primary[600] // #5a67d8 - Darker variant

// Secondary palette  
brandColors.secondary[500] // #764ba2 - Secondary brand color

// Gradients
brandColors.gradient.primary      // Full gradient
brandColors.gradient.primaryLight // Light gradient (10% opacity)
brandColors.gradient.primaryMedium // Medium gradient (20% opacity) 
brandColors.gradient.primaryStrong // Strong gradient (80% opacity)
```

### 2. Semantic Colors
```typescript
import { semanticColors } from './designSystem';

semanticColors.success[500] // #10b981 - Success green
semanticColors.error[500]   // #ef4444 - Error red  
semanticColors.warning[500] // #f59e0b - Warning orange
```

### 3. Spacing System
```typescript
import { spacing } from './designSystem';

spacing.xs   // 4px
spacing.sm   // 8px  
spacing.md   // 12px
spacing.lg   // 16px (Standard)
spacing.xl   // 20px
spacing['2xl'] // 24px
spacing['3xl'] // 32px
```

### 4. Typography
```typescript
import { fontSize } from './designSystem';

fontSize.xs   // 12px
fontSize.sm   // 14px
fontSize.base // 16px (Standard body text)
fontSize.lg   // 18px  
fontSize.xl   // 20px
fontSize['2xl'] // 24px (Headings)
```

### 5. Icon & Avatar Sizes
```typescript
import { iconSizes, avatarSizes, iconStyles, avatarStyles } from './designSystem';

// Icon sizes
iconSizes.md // 20px (Standard icon size)
iconStyles.md // CSS cho icon 20px

// Avatar sizes  
avatarSizes.sm // 24px (Standard small avatar)
avatarStyles.sm // CSS cho avatar 24px
```

### 6. Button Sizing
```typescript
import { buttonSizes } from './designSystem';

// Áp dụng cho button components
${buttonSizes.sm} // Small button
${buttonSizes.md} // Medium button (Standard)
${buttonSizes.lg} // Large button
```

### 7. Border Radius
```typescript
import { borderRadius } from './designSystem';

borderRadius.md   // 8px (Standard button)
borderRadius.lg   // 12px (Standard card)
borderRadius.xl   // 16px (Standard acrylic)
borderRadius.full // 9999px (Circle/pill)
```

### 8. Shadows
```typescript
import { shadows } from './designSystem';

shadows.sm   // Small shadow
shadows.md   // Medium shadow (Standard)
shadows.xl   // Large shadow (Dropdowns)
shadows.brand // Brand colored shadow
```

### 9. Hover Effects
```typescript
import { hoverEffects } from './designSystem';

${hoverEffects.lift}       // translateY(-2px)
${hoverEffects.scaleSmall} // scale(1.02) 
${hoverEffects.slideRight} // translateX(4px)
```

### 10. Focus Ring
```typescript
import { focusRing } from './designSystem';

// Áp dụng cho tất cả interactive elements
${focusRing}
```

## 🔧 Cách sử dụng

### Trong Styled Components

```typescript
import styled from 'styled-components';
import { 
  brandColors, 
  spacing, 
  iconStyles, 
  buttonSizes,
  borderRadius,
  shadows,
  hoverEffects,
  focusRing
} from '../styles/designSystem';

const StyledButton = styled.button`
  ${buttonSizes.md}
  ${hoverEffects.lift}
  ${focusRing}
  
  background: ${brandColors.gradient.primary};
  border-radius: ${borderRadius.md};
  box-shadow: ${shadows.md};
  
  svg {
    ${iconStyles.md}
    color: white;
  }
`;
```

### Quy tắc sử dụng

#### ✅ ĐÚNG:
```typescript
// Sử dụng design system tokens
padding: ${spacing.md} ${spacing.lg};
font-size: ${fontSize.base};
color: ${brandColors.primary[500]};
```

#### ❌ SAI:
```typescript
// Hardcode values
padding: 12px 16px;
font-size: 16px;  
color: #667eea;
```

## 📦 Component Standards

### Button Components
- **Size**: Luôn sử dụng `buttonSizes.md` làm default
- **Colors**: Primary buttons dùng `brandColors.gradient.primaryStrong`
- **Border Radius**: `borderRadius.md` cho buttons
- **Focus**: Bắt buộc có `focusRing`

### Icon Components  
- **Size**: `iconStyles.md` (20px) là standard
- **Colors**: Sử dụng `themeColors.light/dark.text.primary`

### Avatar Components
- **Size**: `avatarStyles.sm` (24px) cho small avatars
- **Border Radius**: `borderRadius.full`

### Dropdown/Modal Components
- **Border Radius**: `borderRadius.xl` (16px)
- **Shadow**: `shadows.xl` hoặc `shadows['2xl']`
- **Background**: Luôn dùng acrylic với opacity 0.98

## 🎯 Migration Guide

Để migrate existing components:

1. Import design system tokens
2. Thay thế hardcoded values
3. Áp dụng standardized hover effects
4. Thêm focus ring cho interactive elements
5. Test trên cả light và dark theme

## 🔄 Updates

Khi cần update design system:
1. Chỉ thay đổi trong `designSystem.ts`
2. Không hardcode values trong components
3. Test toàn bộ ứng dụng sau khi thay đổi

---

**Lưu ý**: Design system này là source of truth duy nhất cho styling. Mọi component mới phải tuân theo các quy tắc này. 