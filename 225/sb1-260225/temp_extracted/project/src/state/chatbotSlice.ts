import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Suggestion {
  id: string;
  text: string;
  timestamp: Date;
}

interface ChatbotState {
  suggestions: Suggestion[];
  loading: boolean;
  error: string | null;
}

const initialState: ChatbotState = {
  suggestions: [],
  loading: false,
  error: null,
};

const chatbotSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {
    addSuggestion: (state, action: PayloadAction<Suggestion>) => {
      state.suggestions.unshift(action.payload);
    },
    clearSuggestions: (state) => {
      state.suggestions = [];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  addSuggestion,
  clearSuggestions,
  setLoading,
  setError,
} = chatbotSlice.actions;

export default chatbotSlice.reducer;