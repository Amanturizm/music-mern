import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { IRegisterResponse, IUser, TUserRegister } from '../../types';

export const register = createAsyncThunk<IUser, TUserRegister>(
  'users/register',
  async (userRegister) => {
    const { data } = await axiosApi.post<IUser>('/users', userRegister);
    return data;
  }
);

export const login = createAsyncThunk<IUser, TUserRegister>(
  'users/login',
  async (user) => {
    const { data } = await axiosApi.post<IRegisterResponse>('/users/sessions', user);

    return data.user;
  }
);