import { IUser, IValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { login, register } from './usersThunk';

interface State {
  user: IUser | null;
  registerLoading: boolean;
  registerError: IValidationError | null;
}

const initialState: State = {
  user: null,
  registerLoading: false,
  registerError: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUser: (state: State) => {
      state.user = null;
    }
  },
  extraReducers: builder => {
    builder.addCase(register.pending, (state: State) => {
      state.registerLoading = true;
      state.registerError = null;
    });
    builder.addCase(register.fulfilled, (state: State, { payload }) => {
      state.registerLoading = false;
      state.user = payload;
    });
    builder.addCase(register.rejected, (state: State, { payload: error }) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });

    builder.addCase(login.pending, (state: State) => {
      state.registerLoading = true;
      state.registerError = null;
    });
    builder.addCase(login.fulfilled, (state: State, { payload }) => {
      state.registerLoading = false;
      state.user = payload;
    });
    builder.addCase(login.rejected, (state: State, { payload: error }) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });
  }
});

export const usersReducer = usersSlice.reducer;
export const { clearUser } = usersSlice.actions;