// src/auth/session.ts

const USER_EMAIL_KEY = 'userEmail';

export function getUserEmail(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(USER_EMAIL_KEY);
}

export function setUserEmail(email: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USER_EMAIL_KEY, email);
}

export function clearUserSession() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(USER_EMAIL_KEY);
}

export function isLoggedIn(): boolean {
  return !!getUserEmail();
}
