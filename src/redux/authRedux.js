import {createSlice} from  '@reduxjs/toolkit';

const authSlice = createSlice({
    name: "user" , 
    initialState:{
        loading:false ,
        currentUser : null , 
        error:false
    } , 
    reducers: {
        loginStart: (state)=>{
            state.loading = true;
            state.error = false;
        } , 
        loginSuccess: (state , action)=>{
            state.loading = false;
            state.currentUser = action.payload;
            state.error = false;
        }, 
        loginFailure:(state)=>{
            state.loading=false;
            state.error = true;
        } , 
        loginOutStart: (state)=>{
            state.loading = true;
            state.error = false;
        } , 
        loginOutSuccess: (state)=>{
            state.loading = false;
            state.currentUser = null;
            state.error = false;
        }, 
        loginOutFailure:(state)=>{
            state.loading=false;
            state.error = true;
        }

    }
});

export const {loginStart , loginSuccess , loginFailure , loginOutStart , loginOutSuccess , loginOutFailure} = authSlice.actions;

export default authSlice.reducer;