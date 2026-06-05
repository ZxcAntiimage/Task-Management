import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import i18n from '@/shared/lib/i18n/settings';
import { SettingsState } from '@/entities';


const initialState: SettingsState = {
  language: 'english',
  timezone: 'english',
  timeFormat: '24hours',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
      // Синхронизация с i18n
      const langCode = action.payload === 'english' ? 'en' : 'ru';
      i18n.changeLanguage(langCode);
    },
    setTimezone: (state, action: PayloadAction<string>) => {
      state.timezone = action.payload;
    },
    setTimeFormat: (state, action: PayloadAction<string>) => {
      state.timeFormat = action.payload;
    },
  },
});

export const { setLanguage, setTimezone, setTimeFormat } = settingsSlice.actions;
export default settingsSlice.reducer;