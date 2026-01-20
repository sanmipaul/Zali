# Accessibility (a11y) Guide

This document describes the accessibility features and best practices implemented throughout the Zali application.

## Overview

Zali is committed to providing an accessible experience for all users, including those with disabilities. We follow the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA and continuously work to improve accessibility.

## Key Accessibility Features

### 1. Skip Navigation Link

**Location**: `src/components/SkipNavLink.tsx`

The skip navigation link allows keyboard users to bypass the navigation and jump directly to the main content.

**Implementation**:
- Screen reader only (sr-only class)
- Visible on focus
- Links to `#main-content` id on the main element
- Styled with focus indicators

**Usage**:
```tsx
<SkipNavLink />
```

**Benefits**:
- Keyboard users can skip repetitive navigation
- Screen reader users can quickly reach content

### 2. Keyboard Navigation

All interactive elements support keyboard navigation:

**Links**: All links are navigable with `Tab` key and clickable with `Enter`

**Buttons**: All buttons support:
- `Tab` key navigation
- `Enter` or `Space` to activate
- Clear focus indicators

**Form Inputs**: All form fields support:
- `Tab` key navigation
- `Shift+Tab` for reverse navigation
- Proper label associations with `htmlFor` attributes

**Mobile Menu**: 
- `Escape` key to close menu
- `Tab` to navigate menu items
- Focus management when menu closes

### 3. Focus Indicators

All interactive elements have visible focus indicators:

**Implementation**:
```css
focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-{color}
```

**Colors Used**:
- Primary buttons: `focus:ring-green-600`
- Secondary buttons: `focus:ring-blue-500`
- Danger actions: `focus:ring-red-600`

**Example**:
```tsx
<button className="focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
  Click me
</button>
```

### 4. Semantic HTML

The application uses semantic HTML elements for better structure:

**Navigation**: `<nav>` and `<Link>` components

**Headings**: Proper heading hierarchy (h1 → h6)
- h1: Page titles (e.g., "Zali: Learn, Play, Earn")
- h2: Section headings
- h3: Subsection headings

**Forms**:
```tsx
<fieldset>
  <legend>Form Group Title</legend>
  {/* form fields */}
</fieldset>
```

**Lists**:
```tsx
<ol role="list">
  <li role="listitem">Item 1</li>
  <li role="listitem">Item 2</li>
</ol>
```

**Sections**: Semantic `<section>` elements with `aria-label` attributes

### 5. ARIA Labels and Attributes

Strategic use of ARIA to enhance accessibility:

**aria-label**: Provides accessible name for elements
```tsx
<button aria-label="Connect wallet">
  Connect
</button>
```

**aria-describedby**: Links element to description
```tsx
<input aria-describedby="username-help" />
<p id="username-help">3-20 characters</p>
```

**aria-invalid**: Indicates form validation errors
```tsx
<input aria-invalid={hasError} aria-describedby="error-message" />
```

**aria-live**: Announces dynamic content updates
```tsx
<div role="status" aria-live="polite">
  {message}
</div>
```

**aria-hidden**: Hides decorative elements
```tsx
<div aria-hidden="true">🎉</div>
```

**aria-pressed**: Indicates button state
```tsx
<button aria-pressed={isSelected}>
  Option A
</button>
```

**aria-busy**: Indicates loading state
```tsx
<button aria-busy={isLoading}>
  {isLoading ? 'Loading...' : 'Submit'}
</button>
```

### 6. Form Accessibility

**Register Form** (`src/app/register/page.tsx`):
- Fieldset/legend structure
- Clear error messages with aria-describedby
- Real-time validation feedback
- Focus indicators on all inputs
- Character count announced to screen readers

**Sign In Form** (`src/app/signin/page.tsx`):
- Fieldset/legend for wallet options
- Clear status messages
- aria-busy during connection
- Help text with focus indicators
- Escape key to close dialogs

### 7. Component-Specific Accessibility

#### QuestionCard (`src/components/QuestionCard.tsx`)
- Fieldset/legend structure for questions
- Each answer option has aria-label
- aria-pressed indicates selected option
- Category and difficulty labels
- Decorative elements marked with aria-hidden

#### Leaderboard (`src/components/Leaderboard.tsx`)
- Semantic `<ol>` for ordered list
- Each rank as `<li>` list item
- Rank badges with aria-label
- Score information with aria-label
- Wallet addresses have full aria-label for screen readers

#### Navigation (`src/components/Navbar.tsx`)
- Proper nav semantics
- Mobile menu with escape key support
- Focus indicators on all links
- aria-expanded for menu button
- aria-haspopup for dropdown menus

### 8. Color Contrast

**Minimum Contrast Ratio**: 4.5:1 for normal text, 3:1 for large text

**Color Scheme**:
- Background: White (#FFFFFF) or light colors
- Text: Dark gray (#333333) or darker
- Links: Blue (#0066CC) or darker
- Buttons: High contrast colored backgrounds

**Tested Colors**:
- Green buttons on white: ✓ 4.5:1 contrast
- Blue links on white: ✓ 7:1 contrast
- Gray text on white: ✓ 5.5:1 contrast

### 9. Page Landmarks

Each page uses proper landmark elements:

```html
<SkipNavLink />      <!-- Skip link at top -->
<Navbar />           <!-- <nav> -->
<main id="main-content"> <!-- Main content -->
  <section>          <!-- Logical sections -->
  </section>
</main>
```

### 10. Error Handling

**Error Messages**:
- Clear, descriptive text
- Associated with form field via aria-describedby
- Marked with role="alert" for important errors
- Color + icon (not just color)

**Example**:
```tsx
<input aria-describedby="error" aria-invalid={hasError} />
{hasError && (
  <p id="error" role="alert" className="text-red-600">
    ✗ {errorMessage}
  </p>
)}
```

### 11. Loading States

**Loading Indicators**:
- Spinning loader with accessible text
- aria-busy attribute on element
- Status message in aria-live region
- Visual + text indicators

**Skeleton Screens** (`src/components/skeletons/`):
- Visual indication of loading
- aria-hidden if purely decorative
- Should not be announced to screen readers

### 12. Testing for Accessibility

**Automated Testing** (`src/components/__tests__/accessibility.test.tsx`):
- jest-axe for automated accessibility checks
- Tests for proper semantic HTML
- ARIA attribute validation
- Focus management tests

**Manual Testing Checklist**:
- [ ] Keyboard navigation (Tab, Shift+Tab, Enter, Escape)
- [ ] Screen reader testing (NVDA, JAWS, VoiceOver)
- [ ] Focus indicators visible
- [ ] Color contrast sufficient
- [ ] Forms labeled correctly
- [ ] Error messages clear
- [ ] No keyboard traps

**Browser DevTools**:
- Chrome DevTools: Lighthouse Accessibility audit
- Firefox DevTools: Accessibility inspector
- Screen Reader Testing: NVDA (Windows), JAWS (Windows), VoiceOver (Mac/iOS)

## Best Practices

### DO:
✅ Use semantic HTML elements
✅ Provide descriptive labels and ARIA labels
✅ Maintain color contrast ratios
✅ Implement keyboard navigation
✅ Use aria-live for dynamic updates
✅ Test with actual assistive technologies
✅ Include focus indicators
✅ Use fieldset/legend for form groups
✅ Provide error messages programmatically
✅ Use proper heading hierarchy

### DON'T:
❌ Use divs for buttons/links without role attributes
❌ Rely on color alone to convey information
❌ Remove focus indicators without replacing them
❌ Use aria-label on interactive elements without proper semantic meaning
❌ Hide form labels with display: none
❌ Use empty alt text on informative images
❌ Trap keyboard focus in modals/menus
❌ Use placeholder as label
❌ Forget to test with keyboard only
❌ Use autoplay on media or scrolling content

## Common Issues and Solutions

### Issue: Missing form labels
**Solution**: Use `<label htmlFor="id">` or fieldset/legend

### Issue: Button not keyboard accessible
**Solution**: Use `<button>` element or add proper keyboard event handlers

### Issue: No focus indicator visible
**Solution**: Add `focus:outline-none focus:ring-2 focus:ring-{color}` classes

### Issue: Image information not accessible
**Solution**: Add descriptive alt text to all images

### Issue: Dynamic content not announced
**Solution**: Use `role="status"` and `aria-live="polite"` on updates

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [The A11Y Project](https://www.a11yproject.com/)
- [WebAIM](https://webaim.org/)
- [MDN: Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

## Accessibility Testing Tools

- **Automated**: jest-axe, Axe DevTools, Lighthouse
- **Manual**: NVDA, JAWS, VoiceOver, Keyboard Only
- **Color Contrast**: WebAIM Contrast Checker
- **Validation**: HTML Validator, WAVE

## Continuous Improvement

Accessibility is an ongoing process. We:
- Regularly test with assistive technologies
- Update components based on user feedback
- Review WCAG guidelines for new features
- Run automated checks in CI/CD pipeline
- Document accessibility decisions

## Contributing

When contributing to Zali:
1. Follow the accessibility practices outlined
2. Test new components with keyboard and screen reader
3. Ensure color contrast is sufficient
4. Add appropriate ARIA labels
5. Include accessibility tests
6. Update this guide if adding new patterns

## Questions?

For accessibility questions or concerns:
- Review this guide first
- Check WCAG 2.1 guidelines
- Test with actual assistive technologies
- Open an issue on GitHub
