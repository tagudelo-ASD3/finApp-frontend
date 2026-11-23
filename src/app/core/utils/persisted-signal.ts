import { WritableSignal, effect, signal } from '@angular/core';

const STORAGE_PREFIX = 'finapp.v1.';

/**
 * Creates a signal that starts from localStorage (or the given initial value)
 * and writes every change back. Must be called inside an injection context.
 * The app has no backend yet, so this is what keeps the mock data between visits.
 */
export function persistedSignal<T>(key: string, initialValue: T): WritableSignal<T> {
  const storageKey = STORAGE_PREFIX + key;
  const state = signal<T>(readValue(storageKey, initialValue));

  effect(() => {
    const value = state();
    try {
      localStorage.setItem(storageKey, JSON.stringify(value));
    } catch {
      // Storage can be blocked (private mode); the app keeps working in memory.
    }
  });

  return state;
}

/** Removes every value saved by the app so the mock data starts fresh. */
export function clearPersistedData(): void {
  try {
    Object.keys(localStorage)
      .filter((key) => key.startsWith(STORAGE_PREFIX))
      .forEach((key) => localStorage.removeItem(key));
  } catch {
    // Nothing to clear when storage is not available.
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
