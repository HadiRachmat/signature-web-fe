import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type Theme = 'light' | 'dark';

export interface AppState {
  theme: Theme;
  loading: boolean;
  error: string | null;
  version?: string;
}

const initialState: AppState = {
  theme: 'light',
  loading: false,
  error: null,
  version: undefined,
};

const appSlice = createSlice({
  name: 'apps',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setVersion(state, action: PayloadAction<string | undefined>) {
      state.version = action.payload;
    },
    resetApp(state) {
      state.theme = initialState.theme;
      state.loading = initialState.loading;
      state.error = initialState.error;
      state.version = initialState.version;
    },
  },
});

export const { setTheme, setLoading, setError, setVersion, resetApp } = appSlice.actions;

export const selectApp = (state: RootState): AppState => state.apps;
export const selectTheme = (state: RootState) => state.apps.theme;
export const selectLoading = (state: RootState) => state.apps.loading;
export const selectError = (state: RootState) => state.apps.error;

export default appSlice.reducer;
