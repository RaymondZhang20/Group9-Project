import { createSlice } from '@reduxjs/toolkit'

export const matchingReducer = createSlice({
    name: 'matchingAccounts',
    initialState: {
        accounts: [
            "{\"email\":\"zhangxueyong2019@163.com\",\"uid\":\"K5G3uLk1Bub5bBwnwejZrEHNGIs2\",\"first_name\":\"XueYong\",\"last_name\":\"Zhang\",\"time_zone\":null,\"location\":null,\"pronoun\":1,\"play_time\":[1,2,3],\"language\":[1],\"platform\":[1,2,4,5]}",
            "{\"email\":\"opkisky@gmail.com\",\"uid\":\"f5oaJV5FuSZViDZ12new9hwvw842\",\"first_name\":\"sss\",\"last_name\":\"zxx\",\"time_zone\":null,\"location\":null,\"pronoun\":1,\"play_time\":[1,2,3],\"language\":[1],\"platform\":[1,2,4,5]}"
        ],
    },
    reducers: {
        removeMatch: (state, action) => {
            
            const uid  = action.payload;
            state.accounts = state.accounts.filter(account => {
              const accountObj = JSON.parse(account);
              return accountObj.uid !== uid;
            });
            console.log(state.accounts)
        }
    }
    
}
)
export const {removeMatch} = matchingReducer.actions

export default matchingReducer.reducer