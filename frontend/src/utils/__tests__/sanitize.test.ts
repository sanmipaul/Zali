import { sanitizeString, sanitizeUsername, sanitizeNumber, sanitizeAddress } from '../sanitize';

describe('sanitizeString', () => {
  it('removes HTML tags', () => {
    expect(sanitizeString('<script>alert("xss")</script>')).toBe('alert(&quot;xss&quot;)');
    expect(sanitizeString('<div>test</div>')).toBe('test');
  });

  it('escapes special characters', () => {
    expect(sanitizeString('"test"')).toBe('&quot;test&quot;');
    expect(sanitizeString("'test'")).toBe('&#x27;test&#x27;');
    expect(sanitizeString('test&test')).toBe('test&amp;test');
  });

  it('handles non-string inputs', () => {
    expect(sanitizeString(null as any)).toBe('');
    expect(sanitizeString(undefined as any)).toBe('');
    expect(sanitizeString(123 as any)).toBe('');
  });
});

describe('sanitizeUsername', () => {
  it('removes invalid characters', () => {
    expect(sanitizeUsername('user@name!')).toBe('username');
    expect(sanitizeUsername('user name')).toBe('username');
    expect(sanitizeUsername('user<script>name</script>')).toBe('username');
  });

  it('enforces length constraints', () => {
    const longName = 'a'.repeat(30);
    expect(sanitizeUsername(longName).length).toBe(20);
  });

  it('allows valid characters', () => {
    expect(sanitizeUsername('valid_username123')).toBe('valid_username123');
  });

  it('trims whitespace', () => {
    expect(sanitizeUsername('  test  ')).toBe('test');
  });
});

describe('sanitizeNumber', () => {
  it('handles string numbers', () => {
    expect(sanitizeNumber('123')).toBe(123);
    expect(sanitizeNumber('12.34')).toBe(12.34);
  });

  it('handles invalid numbers', () => {
    expect(sanitizeNumber('abc')).toBe(0);
    expect(sanitizeNumber(NaN)).toBe(0);
    expect(sanitizeNumber(null)).toBe(0);
    expect(sanitizeNumber(undefined)).toBe(0);
  });

  it('handles valid numbers', () => {
    expect(sanitizeNumber(42)).toBe(42);
    expect(sanitizeNumber(3.14)).toBe(3.14);
  });
});

describe('sanitizeAddress', () => {
  const validAddress = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
  const invalidAddress = '0x123';
  
  it('validates Ethereum addresses', () => {
    expect(sanitizeAddress(validAddress)).toBe(validAddress);
    expect(sanitizeAddress(invalidAddress)).toBe('');
    expect(sanitizeAddress(validAddress.toLowerCase())).toBe(validAddress.toLowerCase());
  });

  it('handles non-string inputs', () => {
    expect(sanitizeAddress(null as any)).toBe('');
    expect(sanitizeAddress(undefined as any)).toBe('');
    expect(sanitizeAddress(123 as any)).toBe('');
  });
});
