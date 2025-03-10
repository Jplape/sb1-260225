import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Equipment {
  id: string;
  name: string;
  model: string;
  status: 'operational' | 'maintenance' | 'error';
  lastMaintenance: string;
  nextMaintenance: string;
  department: string;
}

interface EquipmentState {
  items: Equipment[];
  loading: boolean;
  error: string | null;
}

const initialState: EquipmentState = {
  items: [],
  loading: false,
  error: null,
};

const equipmentSlice = createSlice({
  name: 'equipment',
  initialState,
  reducers: {
    setEquipment: (state, action: PayloadAction<Equipment[]>) => {
      state.items = action.payload;
    },
    addEquipment: (state, action: PayloadAction<Equipment>) => {
      state.items.push(action.payload);
    },
    updateEquipment: (state, action: PayloadAction<Equipment>) => {
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
  setEquipment,
  addEquipment,
  updateEquipment,
  setLoading,
  setError,
} = equipmentSlice.actions;

export default equipmentSlice.reducer;