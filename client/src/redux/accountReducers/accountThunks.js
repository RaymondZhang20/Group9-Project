import { createAsyncThunk } from '@reduxjs/toolkit';
import AccountService from './accountService';

export const getAccountAsync = createAsyncThunk(
    "users/getAccount",
    async (uid) => {
        return await AccountService.getAccount(uid);
    }
);

export const updateAccountAsync = createAsyncThunk(
    "users/updateAccount",
    async (acc) => {
        return await AccountService.updateAccount(acc);
    }
);