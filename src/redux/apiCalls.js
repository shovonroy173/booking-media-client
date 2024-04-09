import axios from "axios";
import { loginFailure, loginOutFailure, loginOutStart, loginOutSuccess, loginStart, loginSuccess } from "./authRedux"
import { travelFailure, travelStart, travelSuccess } from "./travelRedux";

export const register = async(dispatch , user)=>{
    dispatch(loginStart());
    try {
        const res = await axios.post("https://booking-media-api.onrender.com/api/auth/register" , user);
        dispatch(loginSuccess(res.data));
    } catch (error) {
        dispatch(loginFailure());
        alert(error.response.data);
        console.log("LINE AT 12" , error);
    }
};

export const login = async(dispatch , user)=>{
    dispatch(loginStart());
    try {
        const res = await axios.post("https://booking-media-api.onrender.com/api/auth/login" , user);
        dispatch(loginSuccess(res.data));
    } catch (error) {
        dispatch(loginFailure());
        alert(error.response.data);
        console.log("LINE AT 12" , error);
    }
};

export const loginOut = async(dispatch )=>{
    dispatch(loginOutStart());
    try {
        
        dispatch(loginOutSuccess());
    } catch (error) {
        dispatch(loginOutFailure());
       
        console.log("LINE AT 12" , error);
    }
};

export const travelDetails = async(dispatch , travel)=>{
    dispatch(travelStart());
    try {
        dispatch(travelSuccess(travel))
    } catch (error) {
        dispatch(travelFailure())
    }
}