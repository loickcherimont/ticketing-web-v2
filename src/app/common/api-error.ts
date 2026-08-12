import { HttpErrorResponse } from '@angular/common/http';

/**
 * Extracts a user-friendly error message, prioritizing the message sent by
 * the backend. Falls back to a French message when none is available.
 */
export function getErrorMessage(err: unknown, fallback: string): string {
  if (err instanceof HttpErrorResponse) {
    return err.error?.message ?? err.message;
  }
  if (err instanceof Error) {
    return err.message;
  }
  return fallback;
}