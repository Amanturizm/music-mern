import { IUser } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { login, register } from './usersThunk';

interface State {
  user: IUser | null;
  registerLoading: boolean,
}

const initialState: State = {
  user: null,
  registerLoading: false,
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
    });
    builder.addCase(register.fulfilled, (state: State, { payload }) => {
      state.registerLoading = false;
      state.user = payload;
    });
    builder.addCase(register.rejected, (state: State) => {
      state.registerLoading = false;
    });

    builder.addCase(login.pending, (state: State) => {
      state.registerLoading = true;
    });
    builder.addCase(login.fulfilled, (state: State, { payload }) => {
      state.registerLoading = false;
      state.user = payload;
    });
    builder.addCase(login.rejected, (state: State) => {
      state.registerLoading = false;
    });
  }
});

export const usersReducer = usersSlice.reducer;
export const { clearUser } = usersSlice.actions;