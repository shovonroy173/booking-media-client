// import { useDispatch } from "react-redux";
// import { register } from "../../redux/apiCalls";
import LockPersonIcon from '@mui/icons-material/LockPerson';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "./register.css";
import { useState } from "react";
import { register } from '../../redux/apiCalls';
import {useDispatch} from "react-redux";

export default function Register() {
  // const dispatch = useDispatch();
  const [name , setName] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [passwordAgain , setPasswordAgain] = useState("");
  const [client , setClient] = useState("");
  const dispatch = useDispatch();
  const handleClick = ()=>{
    if(password !== passwordAgain) {return alert('Passwords do not match');}
    else{
      register(dispatch , {name , email , password , client });
    }
    
  }
  // console.log("LINE AT 14" , name , password , email , client);
  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerTop">
          <h3 className="registerLogo">booking-media</h3>
          <LockPersonIcon/>
          </div>
        </div>
        <div className="registerRight">
          <div className="registerTitle">
            <h1>Register</h1>
            <p>Please fill  in the form to create an account.</p>
          </div>
          <div className="registerBox">
            <input placeholder="Username" className="registerInput" onChange={((e)=>(setName(e.target.value)))} />
            <input placeholder="Email" className="registerInput" onChange={((e)=>(setEmail(e.target.value)))} />
            <input placeholder="Password" type="password" className="registerInput" onChange={((e)=>(setPassword(e.target.value)))} />
            <input placeholder="Confirm Password" className="registerInput" type="password" onChange={((e)=>(setPasswordAgain(e.target.value)))} />
           
            <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={client}
          onChange={((e)=>(setClient(e.target.value)))}
          autoWidth
          label="Mode"
        >
 
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="user">User</MenuItem>
          
        </Select>
      </FormControl>
    
            <button className="registerButton" onClick={handleClick}>Sign Up</button>

          </div>
        </div>
      
    </div>
  );
}