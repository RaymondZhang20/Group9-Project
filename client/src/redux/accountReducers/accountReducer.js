import {createSlice} from "@reduxjs/toolkit";
import {createAccountAsync, getAccountAsync, updateAccountAsync} from "./accountThunks";
import {REQUEST_STATE} from "../utils";

const initialState = {
    loading_login_register: false,
    auth_error: "",
    alert: false,
    currentUser: {requests:[],ignored_requests:[]},
    request_error: null,
    getAccount: REQUEST_STATE.IDLE,
    createAccount: REQUEST_STATE.IDLE,
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
        },
        setLoadingLogReg: (state, action) => {
            state.loading_login_register = action.payload;
        },
        setAuthError: (state, action) => {
            state.auth_error = action.payload;
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
            .addCase(createAccountAsync.pending, (state) => {
                console.log("create account pending");
                state.createAccount = REQUEST_STATE.PENDING;
                state.request_error = null;
            })
            .addCase(createAccountAsync.fulfilled, (state, action) => {
                console.log("create account fulfilled");
                state.createAccount = REQUEST_STATE.FULFILLED;
            })
            .addCase(createAccountAsync.rejected, (state, action) => {
                console.log("create account rejected");
                console.log(action.error);
                state.createAccount = REQUEST_STATE.REJECTED;
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

export const {emptyAccount, testAccount, setLoadingLogReg, setAuthError} = accountSlice.actions;
export default accountSlice.reducer;