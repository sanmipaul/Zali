/**
 * Accessibility utility functions for WCAG compliance
 */

/**
 * Check if an element is keyboard accessible
 */
export function isKeyboardAccessible(element: HTMLElement): boolean {
  const tabindex = element.getAttribute('tabindex');
  const isNativelyFocusable =
    ['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA'].includes(element.tagName) &&
    !element.hasAttribute('disabled');

  return isNativelyFocusable || (tabindex !== null && parseInt(tabindex) >= 0);
}

/**
 * Generate an accessible label from text
 */
export function generateAccessibleLabel(text: string, context?: string): string {
  const label = text.trim();
  return context ? `${context}: ${label}` : label;
}

/**
 * Check color contrast ratio (simplified WCAG check)
 * Returns true if contrast is sufficient for normal text (4.5:1) or large text (3:1)
 */
export function meetsContrastRequirement(
  foregroundRGB: [number, number, number],
  backgroundRGB: [number, number, number],
  isLargeText: boolean = false
): boolean {
  const getLuminance = (rgb: [number, number, number]): number => {
    const [r, g, b] = rgb.map((val) => {
      const srgb = val / 255;
      return srgb <= 0.03928
        ? srgb / 12.92
        : Math.pow((srgb + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const l1 = getLuminance(foregroundRGB);
  const l2 = getLuminance(backgroundRGB);
  const luminance = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  const contrastRatio = (luminance + 0.05) / (darker + 0.05);
  const minimumRatio = isLargeText ? 3 : 4.5;

  return contrastRatio >= minimumRatio;
}

/**
 * Announce message to screen readers
 */
export function announceToScreenReader(
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
): void {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.style.position = 'absolute';
  announcement.style.left = '-10000px';
  announcement.style.width = '1px';
  announcement.style.height = '1px';
  announcement.style.overflow = 'hidden';

  announcement.textContent = message;
  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Trap focus within a container (useful for modals)
 */
export function trapFocus(container: HTMLElement): {
  activate: () => void;
  deactivate: () => void;
} {
  let previousActiveElement: Element | null = null;

  const getFocusableElements = (): HTMLElement[] => {
    const selectors = [
      'button:not([disabled])',
      'a[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ];
    return Array.from(container.querySelectorAll<HTMLElement>(selectors.join(', ')));
  };

  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key !== 'Tab') return;

    const focusableElements = getFocusableElements();
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement as HTMLElement;

    if (event.shiftKey) {
      if (activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      if (activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };

  return {
    activate: () => {
      previousActiveElement = document.activeElement;
      container.addEventListener('keydown', handleKeyDown);
      const focusableElements = getFocusableElements();
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    },
    deactivate: () => {
      container.removeEventListener('keydown', handleKeyDown);
      if (previousActiveElement instanceof HTMLElement) {
        previousActiveElement.focus();
      }
    },
  };
}

/**
 * Check if element has sufficient focus indicator
 */
export function hasFocusIndicator(element: HTMLElement): boolean {
  const styles = window.getComputedStyle(element);
  const focusOutline = styles.outlineWidth !== '0px';
  const focusRing = element.className.includes('focus:ring');

  return focusOutline || focusRing;
}

/**
 * Get readable text from element
 */
export function getAccessibleText(element: HTMLElement): string {
  const ariaLabel = element.getAttribute('aria-label');
  if (ariaLabel) return ariaLabel;

  const ariaLabelledby = element.getAttribute('aria-labelledby');
  if (ariaLabelledby) {
    const labelElement = document.getElementById(ariaLabelledby);
    if (labelElement) return labelElement.textContent || '';
  }

  return element.textContent || '';
}

/**
 * Validate form field accessibility
 */
export function validateFormFieldAccessibility(field: HTMLInputElement): {
  hasLabel: boolean;
  hasError: boolean;
  isValid: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  // Check for label
  const hasLabel = !!(
    field.getAttribute('aria-label') ||
    field.getAttribute('aria-labelledby') ||
    document.querySelector(`label[for="${field.id}"]`)
  );
  if (!hasLabel) issues.push('Form field should have a label');

  // Check for error handling
  const hasError = field.getAttribute('aria-invalid') === 'true';
  const hasErrorDescription = field.getAttribute('aria-describedby');
  if (hasError && !hasErrorDescription) {
    issues.push('Field marked as invalid should have aria-describedby');
  }

  return {
    hasLabel,
    hasError,
    isValid: issues.length === 0,
    issues,
  };
}

/**
 * Create accessible heading
 */
export function createAccessibleHeading(
  level: 1 | 2 | 3 | 4 | 5 | 6,
  text: string
): string {
  return `<h${level}>${text}</h${level}>`;
}

/**
 * Check if focus is visible
 */
export function isFocusVisible(element: HTMLElement): boolean {
  const hasFocusWithin = element.matches(':focus-visible');
  const hasFocusRing = element.className.includes('focus:');

  return hasFocusWithin || hasFocusRing;
}
