import { configureStore } from '@reduxjs/toolkit';
import accountReducer from "./accountReducers/accountReducer";

export const store = configureStore({
    reducer: {
        account: accountReducer
    },
    devTools: true
});