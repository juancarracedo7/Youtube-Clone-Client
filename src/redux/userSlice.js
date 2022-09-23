import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    actualUser:null,
    loading:false,
    error:false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        loginStart: (state) => {
            state.loading = true
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.actualUser = action.payload
        },
        loginFailed: (state) => {
            state.loading = false;
            state.error = true
        },
        logOut: () => {
            return initialState
        },
        subscription: (state, action) => {
            if (state.currentUser.subscribedUsers.includes(action.payload)) {
              state.currentUser.subscribedUsers.splice(
                state.currentUser.subscribedUsers.findIndex(
                  (channelId) => channelId === action.payload
                ),
                1
              );
            } else {
              state.currentUser.subscribedUsers.push(action.payload);
            }
          },
        
    }
  })

  export const {loginStart,loginSuccess,loginFailed,logOut, subscription} = userSlice.actions

  export default userSlice.reducer