import * as Sentry from '@sentry/nextjs';

interface ErrorContext {
  [key: string]: any;
}

export function trackWalletError(
  error: unknown,
  context: ErrorContext = {},
  level: 'error' | 'warning' | 'info' = 'error'
) {
  if (process.env.NODE_ENV === 'production') {
    Sentry.withScope((scope) => {
      scope.setLevel(level);
      Object.entries(context).forEach(([key, value]) => {
        scope.setExtra(key, value);
      });
      Sentry.captureException(error);
    });
  } else {
    console[level](`[Wallet Error]`, error, context);
  }
}
