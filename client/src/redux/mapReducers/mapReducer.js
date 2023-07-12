import { getFriendsLocationAsync } from "./thunks";
import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const dogStoreSlice = createSlice({
    name: 'locations',
    status: 'idle',
    error: null,
    initialState: {
    locations: []
  },
  extraReducers: (builder) => {
    builder
    .addCase(getFriendsLocationAsync.fulfilled, (state, action) => {
        state.locations = action.payload
      }
    )
}
})

export default dogStoreSlice.reducer