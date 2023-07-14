import { configureStore } from '@reduxjs/toolkit';
import accountReducer from "./accountReducers/accountReducer";
import matchingReducer from './matchingReducers/matchingReducer';
import mapReducer from './mapReducers/mapReducer';

export const store = configureStore({
    reducer: {
        account: accountReducer,
        matchingAccounts: matchingReducer,
        mapReducer: mapReducer
    },
    devTools: true
});