import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Report {
  id: string;
  title: string;
  generatedDate: string;
  type: 'maintenance' | 'incident' | 'inspection';
  status: 'draft' | 'submitted' | 'approved';
  fileUrl: string;
}

interface ReportsState {
  items: Report[];
  loading: boolean;
  error: string | null;
}

const initialState: ReportsState = {
  items: [],
  loading: false,
  error: null,
};

const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    setReports: (state, action: PayloadAction<Report[]>) => {
      state.items = action.payload;
    },
    addReport: (state, action: PayloadAction<Report>) => {
      state.items.push(action.payload);
    },
    updateReport: (state, action: PayloadAction<Report>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
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
  setReports,
  addReport,
  updateReport,
  setLoading,
  setError,
} = reportsSlice.actions;

export default reportsSlice.reducer;