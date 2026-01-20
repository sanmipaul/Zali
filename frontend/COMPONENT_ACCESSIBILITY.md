# Component Accessibility Guide

Detailed accessibility requirements for each component in Zali.

## Navbar

**File**: `src/components/Navbar.tsx`

### Features Implemented
- ✅ Navigation landmark (`<nav>`)
- ✅ Logo link with aria-label
- ✅ Active page indication
- ✅ Mobile menu with ARIA attributes
- ✅ Escape key to close mobile menu
- ✅ Focus indicators on all links
- ✅ Wallet button with aria-label
- ✅ Icon buttons have aria-labels

### Testing
```
[ ] Tab navigates through all links
[ ] Focus indicator visible on each link
[ ] Mobile menu button announces "Open main menu" / "Close main menu"
[ ] Escape closes mobile menu
[ ] Focus returns to menu button when closed
[ ] Wallet address readable with screen reader
```

### Key ARIA Attributes
- `aria-expanded`: Mobile menu state
- `aria-controls`: Links to mobile menu ID
- `aria-haspopup`: Indicates dropdown
- `aria-label`: On icon buttons

---

## QuestionCard

**File**: `src/components/QuestionCard.tsx`

### Features Implemented
- ✅ Fieldset/legend for form structure
- ✅ Answer options as buttons with aria-label
- ✅ aria-pressed for selected state
- ✅ Focus indicators on all options
- ✅ Category and difficulty badges with aria-label
- ✅ Disabled state managed
- ✅ Decorative checkmark has aria-hidden

### Testing
```
[ ] Legend shows question text
[ ] Each option has clear aria-label with letter and text
[ ] Selected option shows aria-pressed="true"
[ ] Category label announced
[ ] Difficulty level announced
[ ] Disabled state prevents selection
[ ] Focus indicators visible on options
```

### Key ARIA Attributes
- `aria-label`: Option labels (e.g., "Option A: Answer text")
- `aria-pressed`: Selected/unselected state
- `aria-hidden`: Decorative elements
- `role="group"`: Options grouping

---

## Leaderboard

**File**: `src/components/Leaderboard.tsx`

### Features Implemented
- ✅ Section with aria-label
- ✅ Ordered list structure
- ✅ List items properly marked
- ✅ Rank badges with aria-label
- ✅ Score information with aria-label
- ✅ Wallet address in aria-label
- ✅ Current user highlighted
- ✅ Icons marked aria-hidden

### Testing
```
[ ] Section announced as "Game leaderboard"
[ ] List announced as "Top 10 players ranking"
[ ] Each rank (1st, 2nd, 3rd) announced with icon
[ ] Player name readable
[ ] Score announced with aria-label
[ ] Your rank section visible if outside top 10
[ ] Trophy icon not read by screen reader
```

### Key ARIA Attributes
- `aria-label`: Section and list labels
- `aria-label`: Rank badges (e.g., "Rank 1")
- `aria-label`: Score information
- `aria-hidden`: Decorative icons

---

## SkipNavLink

**File**: `src/components/SkipNavLink.tsx`

### Features Implemented
- ✅ Screen reader only (.sr-only)
- ✅ Visible on focus
- ✅ Links to #main-content
- ✅ First keyboard stop

### Testing
```
[ ] Not visible normally
[ ] Visible when focused with Tab
[ ] Links to main content
[ ] Can be activated with Enter
[ ] No layout shift when visible
```

### Key Attributes
- `href="#main-content"`: Jump target
- `sr-only` + `focus:not-sr-only`: Visibility

---

## Registration Form

**File**: `src/app/register/page.tsx`

### Features Implemented
- ✅ Fieldset/legend structure
- ✅ Username input with label
- ✅ aria-invalid for errors
- ✅ aria-describedby for help text
- ✅ Requirements list with checkmarks
- ✅ Error messages in role="alert"
- ✅ Submit button with aria-busy
- ✅ Success message with role="status"
- ✅ Focus indicators on input
- ✅ Character counter

### Testing
```
[ ] Fieldset and legend present
[ ] Username label associated
[ ] Help text visible for valid input
[ ] Error text visible for invalid input
[ ] Requirements update as you type
[ ] Submit button disabled until valid
[ ] Loading state announced with aria-busy
[ ] Success message announced with role="status"
```

### Key ARIA Attributes
- `aria-invalid`: Form field validation state
- `aria-describedby`: Links to help/error text
- `aria-busy`: Loading state
- `role="alert"`: Error messages
- `role="status"`: Success messages

---

## Sign In Form

**File**: `src/app/signin/page.tsx`

### Features Implemented
- ✅ Status message with role="status"
- ✅ Fieldset/legend for wallet options
- ✅ Connector buttons with aria-label
- ✅ aria-busy for connecting state
- ✅ Focus indicators on buttons
- ✅ Help button with aria-label
- ✅ Escape to close any messages
- ✅ Icons marked aria-hidden

### Testing
```
[ ] Status message updates announced
[ ] Fieldset contains wallet options
[ ] Each wallet button has aria-label
[ ] Connecting state announced with aria-busy
[ ] Focus indicators visible on buttons
[ ] Help button clickable with Tab
[ ] All content reachable with keyboard
```

### Key ARIA Attributes
- `aria-live="polite"`: Status updates
- `aria-label`: Wallet buttons
- `aria-busy`: Connecting state
- `aria-hidden`: Decorative icons

---

## Home Page

**File**: `src/app/page.tsx`

### Features Implemented
- ✅ Proper h1 page title
- ✅ Section landmarks with aria-label
- ✅ Stats section with role="region"
- ✅ Focus indicators on CTA buttons
- ✅ Feature articles with semantic tags
- ✅ Icons marked aria-hidden
- ✅ Proper heading hierarchy

### Testing
```
[ ] Page title in h1
[ ] Each section has aria-label
[ ] Headings in order (no skips)
[ ] Focus visible on buttons
[ ] Stats region announced
[ ] Decorative icons not read
```

### Key ARIA Attributes
- `aria-label`: Section labels
- `role="region"`: Stats container
- `aria-hidden`: Decorative emojis

---

## Accessibility Requirements by Level

### Level: Critical (Must Have)

- Semantic HTML (button, link, form, etc.)
- Form labels associated
- ARIA landmarks (nav, main, region)
- Keyboard accessibility
- Focus indicators
- Color contrast (4.5:1 for normal text)

### Level: High (Should Have)

- ARIA descriptions for complex elements
- Live regions for dynamic content
- ARIA labels on icon buttons
- Proper heading hierarchy
- Status messages announced
- Error messages clear

### Level: Medium (Nice to Have)

- ARIA busy states
- Decorative elements marked aria-hidden
- Extra documentation
- Testing for specific disabilities
- Performance optimizations

---

## Common Patterns Used

### Form Field with Error
```tsx
<fieldset>
  <legend>Username</legend>
  <input
    aria-invalid={hasError}
    aria-describedby={hasError ? "error" : "help"}
  />
  {hasError && <p id="error" role="alert">{error}</p>}
  {!hasError && <p id="help">{helpText}</p>}
</fieldset>
```

### Icon Button
```tsx
<button aria-label="Delete item">
  <TrashIcon aria-hidden="true" />
</button>
```

### Status Message
```tsx
<div role="status" aria-live="polite" aria-atomic="true">
  {message}
</div>
```

### Disabled Button
```tsx
<button
  disabled={isLoading}
  aria-busy={isLoading}
  aria-label={isLoading ? "Submitting..." : "Submit"}
>
  {isLoading ? "Loading..." : "Submit"}
</button>
```

---

## Testing Components

### Before Merging

1. **Keyboard Only**
   - [ ] All functionality reachable with Tab
   - [ ] Focus visible on all elements
   - [ ] No keyboard traps

2. **Screen Reader**
   - [ ] All text content readable
   - [ ] Button purposes clear
   - [ ] Form labels announced
   - [ ] Errors announced

3. **Visual**
   - [ ] Contrast ≥ 4.5:1
   - [ ] Focus indicators visible
   - [ ] No layout shifts

---

## Updating Components

When modifying components:

1. Check this guide for requirements
2. Run accessibility tests
3. Manual keyboard test
4. Screen reader spot check
5. Verify color contrast
6. Update tests if needed

---

## Resources

- See ACCESSIBILITY.md for overview
- See ARIA_PATTERNS.md for common patterns
- See ACCESSIBILITY_TESTING.md for testing procedures
- See ACCESSIBILITY_CHECKLIST.md for development checklist

---

## Component Accessibility Scores

| Component | Semantic HTML | ARIA | Keyboard | Tests | Overall |
|-----------|---|---|---|---|---|
| Navbar | ✅ | ✅ | ✅ | ✅ | ✅ |
| QuestionCard | ✅ | ✅ | ✅ | ✅ | ✅ |
| Leaderboard | ✅ | ✅ | ✅ | ✅ | ✅ |
| SkipNavLink | ✅ | ✅ | ✅ | ✅ | ✅ |
| RegisterForm | ✅ | ✅ | ✅ | ✅ | ✅ |
| SignInForm | ✅ | ✅ | ✅ | ✅ | ✅ |
| HomePage | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## Maintenance

Review and update this guide:
- When adding new components
- When accessibility issues found
- When frameworks updated
- Quarterly or semi-annually

Last Updated: December 2025
