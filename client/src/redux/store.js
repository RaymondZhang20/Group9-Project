import { configureStore } from '@reduxjs/toolkit';
import accountReducer from "./accountReducers/accountReducer";
import mapReducer from './mapReducers/mapReducer';

export const store = configureStore({
    reducer: {
        account: accountReducer,
        mapReducer: mapReducer
    },
    devTools: true
});