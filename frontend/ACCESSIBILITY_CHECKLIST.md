# Accessibility Checklist

Use this checklist when developing new features or components for Zali.

## Before Development

- [ ] Review WCAG 2.1 guidelines for the feature
- [ ] Identify required ARIA attributes
- [ ] Plan keyboard navigation flow
- [ ] Plan focus indicators
- [ ] Identify decorative vs. semantic elements

## During Development

### Semantic HTML
- [ ] Use `<button>` for buttons, not `<div>`
- [ ] Use `<a>` for links, not `<div>`
- [ ] Use `<form>`, `<fieldset>`, `<legend>` for forms
- [ ] Use `<section>` for logical groupings
- [ ] Use `<ol>` for ordered lists, `<ul>` for unordered
- [ ] Use proper heading hierarchy (h1-h6)
- [ ] Use `<label htmlFor="id">` for form inputs

### Keyboard Navigation
- [ ] Tab to all interactive elements
- [ ] Shift+Tab for reverse navigation
- [ ] Enter/Space to activate buttons
- [ ] Arrow keys for menu navigation (where appropriate)
- [ ] Escape to close dialogs/menus
- [ ] No keyboard traps
- [ ] Logical tab order

### Focus Indicators
- [ ] Visible focus state on all interactive elements
- [ ] Focus indicator contrast ratio ≥ 3:1
- [ ] Focus indicator not removed without replacement
- [ ] Example classes: `focus:outline-none focus:ring-2 focus:ring-{color}`

### ARIA
- [ ] `aria-label` on icon-only buttons
- [ ] `aria-labelledby` on grouped elements
- [ ] `aria-describedby` for descriptions/errors
- [ ] `aria-invalid` on invalid form fields
- [ ] `aria-live` on status messages
- [ ] `aria-hidden` on decorative elements
- [ ] `aria-pressed` on toggle buttons
- [ ] `aria-expanded` on collapsible content
- [ ] `aria-busy` during loading

### Color & Contrast
- [ ] Contrast ratio ≥ 4.5:1 for normal text
- [ ] Contrast ratio ≥ 3:1 for large text (18pt+)
- [ ] Color not used alone to convey information
- [ ] Icons have sufficient contrast with background

### Forms
- [ ] Clear, visible labels
- [ ] Error messages associated with fields
- [ ] Error messages descriptive and actionable
- [ ] Required fields indicated clearly
- [ ] Form validation announced to screen readers
- [ ] Character count announced (if applicable)

### Dynamic Content
- [ ] Updates announced via `aria-live`
- [ ] Loading states indicated
- [ ] Results announced to screen readers
- [ ] Confirmation messages provided

## Testing

### Keyboard Only
- [ ] Navigate using Tab key only
- [ ] All functionality reachable
- [ ] No traps or missing elements

### Screen Reader (at least one)
- [ ] All text content readable
- [ ] Form labels announced
- [ ] Buttons announced with purpose
- [ ] Landmarks announced
- [ ] Headings announced with level
- [ ] Lists announced correctly
- [ ] Images have alt text (or aria-hidden)
- [ ] Links have purpose

### Browser DevTools
- [ ] Lighthouse Accessibility audit
- [ ] No detected issues
- [ ] Manual review of detected items

### Contrast Verification
- [ ] Use WebAIM Contrast Checker
- [ ] Test with color-blind simulators
- [ ] Verify ratio ≥ 4.5:1

### Manual Testing Checklist
- [ ] Test with NVDA (Windows)
- [ ] Test with JAWS (Windows)
- [ ] Test with VoiceOver (Mac/iOS)
- [ ] Test keyboard only
- [ ] Test with zoom at 200%
- [ ] Test with motion/animation reduced
- [ ] Test on mobile device
- [ ] Test on different browsers

## Components

### Buttons
- [ ] Button element used
- [ ] aria-label if icon only
- [ ] Focus indicators visible
- [ ] disabled state handled
- [ ] aria-pressed for toggles

### Links
- [ ] Clear link text (not "click here")
- [ ] href attribute set
- [ ] aria-label if icon only
- [ ] External links indicated
- [ ] No underline needed (color sufficient)

### Forms
- [ ] Label for each input
- [ ] Fieldset/legend for groups
- [ ] Error messages associated
- [ ] Required field indicated
- [ ] Helper text available
- [ ] Placeholder not used as label

### Navigation
- [ ] Landmark nav element
- [ ] Skip link provided
- [ ] Current page indicated
- [ ] Logical tab order
- [ ] Mobile menu accessible

### Images
- [ ] Meaningful alt text
- [ ] Decorative images hidden
- [ ] Complex images with description
- [ ] Text in images avoided

### Modals/Dialogs
- [ ] Focus trapped within modal
- [ ] Can close with Escape
- [ ] Title announced
- [ ] Focus returned on close
- [ ] aria-modal attribute set

### Lists
- [ ] Ordered lists use `<ol>`
- [ ] Unordered lists use `<ul>`
- [ ] List items use `<li>`
- [ ] No nested div structure

## Post-Development

- [ ] All checklist items completed
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] Code reviewed for a11y
- [ ] No regressions introduced
- [ ] Accessibility maintained across device sizes

## Common Mistakes to Avoid

❌ Using only color to convey information
❌ Removing focus indicators
❌ Using placeholder as label
❌ Keyboard traps
❌ Missing alt text
❌ Generic button text ("Click Here")
❌ Poor color contrast
❌ Unlabeled form fields
❌ Decorative elements announced
❌ Missing heading hierarchy

## Resources

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM](https://webaim.org/)
- [A11Y Project](https://www.a11yproject.com/)

## Questions?

Refer to:
1. ACCESSIBILITY.md for detailed guidelines
2. Existing components for patterns
3. WCAG 2.1 for specific requirements
4. Team lead if unclear
