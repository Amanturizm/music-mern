import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { IRegisterResponse, IUser, IValidationError, TUserRegister } from '../../types';
import { isAxiosError } from 'axios';

export const register = createAsyncThunk<IUser, TUserRegister, { rejectValue: IValidationError }>(
  'users/register',
  async (userRegister, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.post<IUser>('/users', userRegister);
      return data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  }
);

export const login = createAsyncThunk<IUser, TUserRegister, { rejectValue: IValidationError }>(
  'users/login',
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axiosApi.post<IRegisterResponse>('/users/sessions', user);
      return data.user;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  }
);