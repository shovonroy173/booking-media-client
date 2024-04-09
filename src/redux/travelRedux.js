import {createSlice} from  '@reduxjs/toolkit';

const travelSlice = createSlice({
    name: "travel" , 
    initialState:{
        loading:false ,
        currentTravel : null , 
        error:false
    } , 
    reducers: {
        travelStart: (state)=>{
            state.loading = true;
            state.error = false;
        } , 
        travelSuccess: (state , action)=>{
            state.loading = false;
            state.currentTravel = action.payload;
            state.error = false;
        }, 
        travelFailure:(state)=>{
            state.loading=false;
            state.error = true;
        } , 

    }
});

export const {travelStart , travelSuccess , travelFailure } = travelSlice.actions;

export default travelSlice.reducer;