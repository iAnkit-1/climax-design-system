# ClimaX Accessibility Guidelines

## Overview
This document outlines accessibility requirements and best practices for the ClimaX carbon credit platform. All features must meet WCAG 2.1 Level AA standards.

## 🎯 Touch Targets

### Minimum Sizes
- **Mobile:** 44x44 CSS pixels minimum for all interactive elements
- **Desktop:** 24x24 CSS pixels minimum (recommended 44x44 for consistency)
- **Spacing:** Minimum 8px between adjacent touch targets

### Implementation
```tsx
// Correct - Meets minimum touch target size
<button className="min-w-[44px] min-h-[44px] p-3">
  <Icon className="w-5 h-5" />
</button>

// Incorrect - Too small
<button className="p-1">
  <Icon className="w-4 h-4" />
</button>
```

## ⌨️ Keyboard Navigation

### Tab Order
- Follows logical visual order (left-to-right, top-to-bottom)
- Skip links provided to bypass repetitive content
- Modal dialogs trap focus within dialog
- Escape key closes dialogs and dropdowns

### Focus Indicators
All focusable elements must have visible focus indicators:

```css
.focus-visible:outline-none 
.focus-visible:ring-2 
.focus-visible:ring-primary 
.focus-visible:ring-offset-2
```

### Keyboard Shortcuts
- `Tab`: Move focus forward
- `Shift + Tab`: Move focus backward
- `Enter` / `Space`: Activate buttons and links
- `Escape`: Close dialogs, dropdowns, modals
- `Arrow Keys`: Navigate within menus and lists

## 🏷️ ARIA Labels & Roles

### When to Use ARIA

#### Landmark Roles
```tsx
<nav role="navigation" aria-label="Main navigation">
<main role="main" aria-label="Main content">
<aside role="complementary" aria-label="Sidebar">
<footer role="contentinfo">
```

#### Form Labels
```tsx
// Every input must have an associated label
<label htmlFor="email">Email Address</label>
<input 
  id="email" 
  type="email"
  aria-describedby="email-error"
  aria-invalid={hasError}
  aria-required="true"
/>
{hasError && <span id="email-error" role="alert">Please enter a valid email</span>}
```

#### Button Labels
```tsx
// Icon-only buttons MUST have aria-label
<button aria-label="Close dialog">
  <X className="w-4 h-4" />
</button>

// Buttons with text don't need aria-label
<button>Save Changes</button>
```

#### Status Updates
```tsx
// Announce loading states
<div role="status" aria-live="polite" aria-atomic="true">
  {isLoading ? "Loading projects..." : "Projects loaded"}
</div>

// Critical errors
<div role="alert" aria-live="assertive">
  {error && "Error: Unable to load projects"}
</div>
```

#### Lists and Navigation
```tsx
// Breadcrumbs
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li aria-current="page">Projects</li>
  </ol>
</nav>

// Current page indicator
<a href="/dashboard" aria-current="page">Dashboard</a>
```

## 🎨 Color Contrast

### Requirements (WCAG AA)
- **Normal text:** 4.5:1 minimum contrast ratio
- **Large text (18pt/24px+):** 3:1 minimum
- **UI components & graphics:** 3:1 minimum
- **Focus indicators:** 3:1 minimum

### Testing Tools
- Chrome DevTools Lighthouse
- axe DevTools extension
- WebAIM Contrast Checker

### Color Usage
```tsx
// Good - High contrast on primary color
<Button variant="primary">Submit</Button> 
// Text: white (#ffffff) on teal (#1A7F7F) = 4.8:1

// Bad - Low contrast
<div className="text-gray-400 bg-gray-300">
  Low contrast text
</div>
```

## 📝 Form Accessibility

### Required Fields
```tsx
<label htmlFor="name">
  Name <span aria-label="required" className="text-destructive">*</span>
</label>
<input 
  id="name"
  name="name"
  type="text"
  required
  aria-required="true"
/>
```

### Autocomplete Attributes
Always include autocomplete for better UX:

```tsx
<input type="text" name="name" autocomplete="name" />
<input type="email" name="email" autocomplete="email" />
<input type="tel" name="phone" autocomplete="tel" />
<input type="text" name="organization" autocomplete="organization" />
<input type="text" name="address" autocomplete="street-address" />
<input type="text" name="city" autocomplete="address-level2" />
<input type="text" name="state" autocomplete="address-level1" />
<input type="text" name="pincode" autocomplete="postal-code" />
<input type="text" name="country" autocomplete="country" />
```

### Error Handling
```tsx
const [errors, setErrors] = useState<Record<string, string>>({});

<div>
  <label htmlFor="email">Email</label>
  <input
    id="email"
    type="email"
    aria-invalid={!!errors.email}
    aria-describedby={errors.email ? "email-error" : undefined}
  />
  {errors.email && (
    <span id="email-error" role="alert" className="text-destructive text-sm">
      {errors.email}
    </span>
  )}
</div>
```

### Form Validation
- Validate on blur (not on every keystroke)
- Show errors inline below field
- Provide error summary at form top for multiple errors
- Don't rely on color alone to indicate errors
- Use icons + text for error states

## 📱 Mobile Accessibility

### Responsive Design
- Mobile-first approach
- Touch targets 44x44px minimum
- Adequate spacing between interactive elements
- No horizontal scrolling
- Text remains readable at 200% zoom

### Mobile Navigation
```tsx
// Bottom tab navigation
<nav 
  className="fixed bottom-0 left-0 right-0"
  role="navigation"
  aria-label="Mobile bottom navigation"
>
  <Link 
    to="/dashboard" 
    className="min-w-[44px] min-h-[44px]"
    aria-label="Navigate to dashboard"
    aria-current={isActive ? "page" : undefined}
  >
    <Home className="w-5 h-5" />
    <span>Home</span>
  </Link>
</nav>
```

### Viewport Settings
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
```

## 🖼️ Images & Media

### Alt Text
```tsx
// Decorative images
<img src="pattern.svg" alt="" role="presentation" />

// Informative images
<img 
  src="solar-panel.jpg" 
  alt="Rooftop solar panels installed on commercial building in Mumbai"
/>

// Complex images (charts, diagrams)
<img 
  src="emissions-chart.png"
  alt="Bar chart showing carbon emissions reduced by 45% from 2022 to 2024"
  longdesc="#chart-description"
/>
<div id="chart-description">
  <h3>Detailed Chart Description</h3>
  <p>The chart shows emissions data over 3 years...</p>
</div>
```

### Icons
```tsx
// Decorative icons (with visible text)
<button>
  <Save className="w-4 h-4" aria-hidden="true" />
  <span>Save</span>
</button>

// Functional icons (icon-only buttons)
<button aria-label="Save changes">
  <Save className="w-4 h-4" />
</button>
```

## 🔊 Screen Reader Testing

### Tools
- **Windows:** NVDA (free), JAWS
- **macOS:** VoiceOver (built-in)
- **Mobile:** TalkBack (Android), VoiceOver (iOS)

### Testing Checklist
- [ ] All content accessible via screen reader
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] Form labels correctly associated
- [ ] Buttons and links have descriptive text
- [ ] Alt text for images
- [ ] Status messages announced
- [ ] Focus order is logical
- [ ] No keyboard traps

## 📊 Data Tables

### Accessible Tables
```tsx
<table role="table" aria-label="Transaction history">
  <caption className="sr-only">Recent transactions with date, type, amount, and status</caption>
  <thead>
    <tr>
      <th scope="col">Date</th>
      <th scope="col">Type</th>
      <th scope="col">Amount</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Jan 18, 2024</td>
      <td>Buy</td>
      <td>₹42,500</td>
      <td><Badge variant="default">Completed</Badge></td>
    </tr>
  </tbody>
</table>
```

### Sortable Tables
```tsx
<th scope="col">
  <button 
    onClick={() => handleSort('date')}
    aria-sort={sortDirection}
    aria-label="Sort by date"
  >
    Date
    {sortBy === 'date' && (
      <ArrowUp className={sortDirection === 'desc' ? 'rotate-180' : ''} />
    )}
  </button>
</th>
```

## 🔍 Skip Links

Add skip links to bypass repetitive content:

```tsx
export const SkipLink = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
  >
    Skip to main content
  </a>
);
```

## ⚡ Loading & Skeleton States

### Loading States
```tsx
<div role="status" aria-live="polite" aria-busy={isLoading}>
  {isLoading ? (
    <>
      <span className="sr-only">Loading projects...</span>
      <Skeleton className="h-48 w-full" />
    </>
  ) : (
    <ProjectList projects={projects} />
  )}
</div>
```

## 🧪 Testing Checklist

### Manual Testing
- [ ] Navigate entire site using only keyboard
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Verify color contrast ratios
- [ ] Check touch target sizes on mobile
- [ ] Test with 200% browser zoom
- [ ] Verify focus indicators visible
- [ ] Test form validation and error messages
- [ ] Check all images have appropriate alt text

### Automated Testing
- [ ] Run axe DevTools scan
- [ ] Run Lighthouse accessibility audit
- [ ] Use WAVE browser extension
- [ ] Validate HTML with W3C validator

## 📚 Resources

### Standards & Guidelines
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Articles](https://webaim.org/articles/)

### Tools
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [NVDA Screen Reader](https://www.nvaccess.org/)

### Testing Services
- [Accessibility Insights](https://accessibilityinsights.io/)
- [Pa11y](https://pa11y.org/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

---

## Implementation Priority

### P0 (Critical - Must Have)
- Keyboard navigation
- Focus indicators
- Form labels
- Alt text for images
- Color contrast
- Touch targets 44px

### P1 (High - Should Have)
- ARIA labels for complex widgets
- Skip links
- Error announcements
- Loading states

### P2 (Medium - Nice to Have)
- Breadcrumbs
- Status messages
- Enhanced keyboard shortcuts
- Advanced ARIA patterns

### P3 (Low - Future Enhancement)
- Voice control
- Multiple language support
- User preference settings
- High contrast mode toggle
