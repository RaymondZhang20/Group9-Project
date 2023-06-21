import { configureStore } from '@reduxjs/toolkit';
import accountReducer from "./accountReducers/accountReducer";
import matchingReducer from './matchingReducers/matchingReducer';

export const store = configureStore({
    reducer: {
        account: accountReducer,
        matchingAccounts: matchingReducer
    },
    devTools: true
});