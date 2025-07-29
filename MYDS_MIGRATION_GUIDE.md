# KD Portal → MYDS Migration Guide

## Overview
This guide outlines the step-by-step process to migrate KD Portal from custom components to MYDS (Malaysia Digital Services) components with minimal impact.

## Current Status
- ✅ MYDS packages installed
- ✅ MYDS stylesheet imported
- ✅ MYDS wrapper component created
- 🔄 Component migration in progress

## Migration Strategy

### Phase 1: Low-Impact Components (Start Here)
These components can be migrated with minimal changes:

#### 1. Button Component
**Current**: `src/components/ui/button.tsx`
**Target**: MYDS Button

```typescript
// Before
import { Button } from "@/components/ui/button";

// After
import { Button } from "@/components/ui/myds-wrapper";
```

**Migration Notes**:
- MYDS Button variants: `primary-fill`, `secondary-fill`, `tertiary-fill`, `primary-outline`, `secondary-outline`, `tertiary-outline`
- Size variants: `sm`, `md`, `lg`
- Replace custom variants with MYDS equivalents

#### 2. Input Component
**Current**: Custom input styling
**Target**: MYDS Input

```typescript
// Before
<input className="custom-input-classes" />

// After
import { Input } from "@/components/ui/myds-wrapper";
<Input />
```

#### 3. Select Component
**Current**: `src/components/ui/select.tsx`
**Target**: MYDS Select

#### 4. Checkbox & Radio
**Current**: Custom implementations
**Target**: MYDS Checkbox & Radio

### Phase 2: Medium-Impact Components

#### 1. Table Components
**Current**: `src/components/ui/table.tsx`, `src/components/ui/data-table.tsx`
**Target**: MYDS Table & DataTable

**Migration Notes**:
- MYDS DataTable provides built-in sorting, filtering, and pagination
- May require data structure adjustments

#### 2. Pagination
**Current**: `src/components/ui/pagination.tsx`
**Target**: MYDS Pagination

#### 3. Date Components
**Current**: `src/components/ui/date-picker.tsx`, `src/components/ui/daterange-picker.tsx`
**Target**: MYDS DatePicker & DateRangePicker

### Phase 3: High-Impact Components

#### 1. Layout Components
**Current**: `src/components/layout/header.tsx`, `src/components/layout/footer.tsx`
**Target**: MYDS Masthead, Navbar, Footer

**Migration Notes**:
- Requires significant restructuring
- MYDS provides government-specific branding and navigation patterns

#### 2. Search Components
**Current**: `src/components/ui/search.tsx`, `src/components/home/searchbar.tsx`
**Target**: MYDS SearchBar

#### 3. Dialog/Modal Components
**Current**: `src/components/ui/FeedbackDialog.tsx`
**Target**: MYDS Dialog

## Component Mapping

| Current Component | MYDS Component | Migration Priority | Notes |
|------------------|----------------|-------------------|-------|
| `button.tsx` | `Button` | High | Direct replacement |
| `input.tsx` | `Input` | High | Direct replacement |
| `select.tsx` | `Select` | High | Direct replacement |
| `table.tsx` | `Table` | Medium | May need data structure changes |
| `data-table.tsx` | `DataTable` | Medium | Built-in features available |
| `pagination.tsx` | `Pagination` | Medium | Direct replacement |
| `date-picker.tsx` | `DatePicker` | Medium | Direct replacement |
| `daterange-picker.tsx` | `DateRangePicker` | Medium | Direct replacement |
| `accordion.tsx` | `Accordion` | Low | Direct replacement |
| `breadcrumb.tsx` | `Breadcrumb` | Low | Direct replacement |
| `header.tsx` | `Masthead` + `Navbar` | Low | Major restructuring needed |
| `footer.tsx` | `Footer` | Low | Major restructuring needed |

## Migration Steps

### Step 1: Update Import Statements
Replace component imports throughout the codebase:

```bash
# Find all component imports
grep -r "from.*@/components/ui" src/
```

### Step 2: Update Component Props
MYDS components may have different prop interfaces. Update accordingly:

```typescript
// Example: Button migration
// Before
<Button variant="primary" size="md">Click me</Button>

// After
<Button variant="primary-fill" size="md">Click me</Button>
```

### Step 3: Update Styling
Remove custom Tailwind classes that conflict with MYDS:

```typescript
// Before
<Button className="bg-blue-500 hover:bg-blue-600">Click me</Button>

// After
<Button variant="primary-fill">Click me</Button>
```

### Step 4: Test Components
Test each migrated component thoroughly:
- Visual appearance
- Functionality
- Accessibility
- Responsive behavior

## CSS Conflicts Resolution

### 1. Tailwind Conflicts
MYDS uses its own design system. Remove conflicting Tailwind classes:

```css
/* Remove these from globals.css if they conflict */
.brand-600 { /* Remove if conflicts with MYDS */ }
.button-shadow { /* Remove if conflicts with MYDS */ }
```

### 2. Custom Variables
MYDS provides its own CSS variables. Update custom variables:

```css
/* Before */
:root {
  --brand-600: #2563EB;
}

/* After - use MYDS variables */
:root {
  /* MYDS provides its own color system */
}
```

## Testing Strategy

### 1. Visual Regression Testing
- Compare screenshots before/after migration
- Test on different screen sizes
- Test in different browsers

### 2. Functionality Testing
- Test all interactive elements
- Test form submissions
- Test navigation flows

### 3. Accessibility Testing
- Run accessibility audits
- Test keyboard navigation
- Test screen reader compatibility

## Rollback Plan

If issues arise during migration:

1. **Component-level rollback**: Revert individual components
2. **Feature-level rollback**: Revert entire features
3. **Full rollback**: Revert to pre-migration state

## Benefits of Migration

1. **Consistency**: Align with Malaysian government design standards
2. **Maintenance**: Reduced custom code maintenance
3. **Accessibility**: Built-in accessibility features
4. **Updates**: Automatic design system updates
5. **Compliance**: Government design compliance

## Timeline Estimate

- **Phase 1 (Low-impact)**: 1-2 weeks
- **Phase 2 (Medium-impact)**: 2-3 weeks  
- **Phase 3 (High-impact)**: 3-4 weeks
- **Testing & Polish**: 1-2 weeks

**Total**: 7-11 weeks

## Next Steps

1. Start with Phase 1 components (Button, Input, Select)
2. Create migration branches for each phase
3. Set up visual regression testing
4. Begin component-by-component migration
5. Regular testing and validation

## Resources

- [MYDS Documentation](https://design.digital.gov.my/en/docs/develop/install)
- [MYDS Component Library](https://design.digital.gov.my/en/docs/develop/components)
- [MYDS Design Tokens](https://design.digital.gov.my/en/docs/develop/tokens) 