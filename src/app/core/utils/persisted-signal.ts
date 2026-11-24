import { WritableSignal, effect, signal } from '@angular/core';

const STORAGE_PREFIX = 'finapp.v2.';
const DEMO_MONTH_KEY = STORAGE_PREFIX + 'demo-month';
const KEPT_KEYS = ['session', 'dark-mode'].map((key) => STORAGE_PREFIX + key);

// Signal saved in localStorage; it keeps the mock data between visits until there is a backend.
export function persistedSignal<T>(key: string, initialValue: T): WritableSignal<T> {
  const storageKey = STORAGE_PREFIX + key;
  const state = signal<T>(readValue(storageKey, initialValue));

  effect(() => {
    const value = state();
    try {
      localStorage.setItem(storageKey, JSON.stringify(value));
    } catch {
      // Private mode can block storage; the app keeps working in memory.
    }
  });

  return state;
}

export function clearPersistedData(): void {
  try {
    Object.keys(localStorage)
      .filter((key) => key.startsWith('finapp.') && !KEPT_KEYS.includes(key))
      .forEach((key) => localStorage.removeItem(key));
  } catch {
    return;
  }
}

// Mock dates depend on today, so the demo data starts again when a new month begins.
export function refreshDemoDataForNewMonth(): void {
  const today = new Date();
  const currentMonth = `${today.getFullYear()}-${today.getMonth() + 1}`;
  try {
    if (localStorage.getItem(DEMO_MONTH_KEY) !== currentMonth) {
      clearPersistedData();
      localStorage.setItem(DEMO_MONTH_KEY, currentMonth);
    }
  } catch {
    return;
  }
}

function readValue<T>(storageKey: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
