import { createAsyncThunk } from '@reduxjs/toolkit';
import UserService from './service';

export const getFriendsLocationAsync = createAsyncThunk(
    'GET_DOGS',
    async (uid) => {
        return await UserService.getFriendsLocation(uid)
    }
  );