import { NativeModules, Platform } from 'react-native';

const memoryStore = new Map<string, string>();

const inMemoryStorage = {
  getItem: async (key: string): Promise<string | null> => {
    return memoryStore.get(key) ?? null;
  },
  setItem: async (key: string, value: string): Promise<void> => {
    memoryStore.set(key, value);
  },
  removeItem: async (key: string): Promise<void> => {
    memoryStore.delete(key);
  },
  clear: async (): Promise<void> => {
    memoryStore.clear();
  },
};

// Check if native AsyncStorage bridge module is available in the current binary
const hasNativeAsyncStorage = Boolean(
  NativeModules?.RNCAsyncStorage ||
  NativeModules?.PlatformLocalStorage ||
  NativeModules?.RNC_AsyncSQLiteDBStorage ||
  (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage),
);

let storage: {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
};

if (hasNativeAsyncStorage) {
  try {
    const nativeModule = require('@react-native-async-storage/async-storage').default;
    storage = nativeModule ?? inMemoryStorage;
  } catch {
    storage = inMemoryStorage;
  }
} else {
  storage = inMemoryStorage;
}

export const SafeStorage = storage;
