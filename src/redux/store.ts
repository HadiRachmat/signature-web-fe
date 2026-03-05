import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AppReducer from './slices/appSlice';

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  type PersistConfig,
} from 'redux-persist';

// use a safe storage wrapper that works in SSR/test environments and
// always exposes getItem/setItem/removeItem returning Promises as
// redux-persist expects. This avoids errors like
// "storage.getItem is not a function" when a bundler or environment
// provides an unexpected `storage` implementation.
const createWebStorage = (type: 'localStorage' | 'sessionStorage') => {
  try {
    const storage = (typeof window !== 'undefined' && window[type]) as Storage | undefined;
    if (!storage) return null;

    return {
      getItem: (key: string) => Promise.resolve(storage.getItem(key)),
      setItem: (key: string, value: string) => Promise.resolve(storage.setItem(key, value)),
      removeItem: (key: string) => Promise.resolve(storage.removeItem(key)),
    };
  } catch {
    // If accessing window/storage throws, return null to let the
    // fallback below create a noop storage.
    return null;
  }
};

const storage = createWebStorage('localStorage') ?? {
  // noop async storage for non-browser environments
  getItem: () => Promise.resolve(null),
  setItem: () => Promise.resolve(),
  removeItem: () => Promise.resolve(),
};

const rootReducer = combineReducers({
  apps: AppReducer,
});

const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
  key: 'root',
  storage,
  whitelist: ['apps'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// ...existing code...
export type RootState = ReturnType<typeof rootReducer>; // use rootReducer type to avoid runtime circular issues
export type AppDispatch = typeof store.dispatch;
