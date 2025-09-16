// src/hooks/useLocalStorage.ts
import { useState, useEffect } from "react";

// A generic function to safely get a value from local storage.
function getStorageValue<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") {
    return defaultValue;
  }

  try {
    const saved = localStorage.getItem(key);
    if (saved !== null) {
      return JSON.parse(saved) as T;
    }
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error);
  }

  return defaultValue;
}

export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    }
  }, [key, value]);

  return [value, setValue];
}
