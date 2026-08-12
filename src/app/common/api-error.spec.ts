import { HttpErrorResponse } from '@angular/common/http';
import { getErrorMessage } from './api-error';

describe('getErrorMessage', () => {
  const fallback = 'Message de secours';

  it('returns the backend message when present (error body)', () => {
    const err = new HttpErrorResponse({ status: 401, error: { message: 'Email et/ou mot de passe incorrect' } });
    expect(getErrorMessage(err, fallback)).toBe('Email et/ou mot de passe incorrect');
  });

  it('falls back to the Angular message when body is empty', () => {
    const err = new HttpErrorResponse({ status: 500, error: null });
    expect(getErrorMessage(err, fallback)).toBe(err.message);
  });

  it('returns the Error message for a generic Error', () => {
    expect(getErrorMessage(new Error('boom'), fallback)).toBe('boom');
  });

  it('returns the fallback for an unknown value', () => {
    expect(getErrorMessage(undefined, fallback)).toBe(fallback);
  });
});