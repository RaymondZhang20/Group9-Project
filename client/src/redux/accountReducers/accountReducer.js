import {createSlice} from "@reduxjs/toolkit";
import {getAccountAsync, updateAccountAsync} from "./accountThunks";
import {REQUEST_STATE} from "../utils";

const initialState = {
    loading_login_register: false,
    loading_context: true,
    auth_error: "",
    alert: false,
    currentUser: {},
    request_error: null,
    getAccount: REQUEST_STATE.IDLE,
    updateAccount: REQUEST_STATE.IDLE
}

const accountSlice = createSlice({
    name: 'account',
    initialState: initialState,
    reducers: {
        emptyAccount: (state, action) => {
            state.currentUser = {};
        },
        testAccount: (state, action) => {
            console.log(JSON.parse(JSON.stringify(state.currentUser)));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAccountAsync.pending, (state) => {
                console.log("get account pending");
                state.getAccount = REQUEST_STATE.PENDING;
                state.request_error = null;
            })
            .addCase(getAccountAsync.fulfilled, (state, action) => {
                console.log("get account fulfilled");
                state.getAccount = REQUEST_STATE.FULFILLED;
                state.currentUser = action.payload;
            })
            .addCase(getAccountAsync.rejected, (state, action) => {
                console.log("get account rejected" + action.error);
                state.getAccount = REQUEST_STATE.REJECTED;
                state.request_error = action.error;
            })
            .addCase(updateAccountAsync.pending, (state) => {
                console.log("update account pending");
                state.updateAccount = REQUEST_STATE.PENDING;
                state.request_error = null;
            })
            .addCase(updateAccountAsync.fulfilled, (state, action) => {
                console.log("update account fulfilled");
                state.updateAccount = REQUEST_STATE.FULFILLED;
                state.currentUser = {...state.currentUser, ...action.payload};
            })
            .addCase(updateAccountAsync.rejected, (state, action) => {
                console.log("update account rejected" + action.error);
                state.updateAccount = REQUEST_STATE.REJECTED;
                state.request_error = action.error;
                console.log(state.error);
            });
    }
});

export const {emptyAccount, testAccount} = accountSlice.actions;
export default accountSlice.reducer;