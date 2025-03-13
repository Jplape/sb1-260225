import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Intervention {
  id: string;
  equipmentId: string;
  technicianId: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  description: string;
  scheduledDate: string;
  completedDate?: string;
}

interface InterventionsState {
  items: Intervention[];
  loading: boolean;
  error: string | null;
}

const initialState: InterventionsState = {
  items: [],
  loading: false,
  error: null,
};

const interventionsSlice = createSlice({
  name: 'interventions',
  initialState,
  reducers: {
    setInterventions: (state, action: PayloadAction<Intervention[]>) => {
      state.items = action.payload;
    },
    addIntervention: (state, action: PayloadAction<Intervention>) => {
      state.items.push(action.payload);
    },
    updateIntervention: (state, action: PayloadAction<Intervention>) => {
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
  setInterventions,
  addIntervention,
  updateIntervention,
  setLoading,
  setError,
} = interventionsSlice.actions;

export default interventionsSlice.reducer;