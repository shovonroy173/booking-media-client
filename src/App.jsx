import "./App.css";
import Home from './pages/Home/Home';
import   { BrowserRouter as  Router, Route, Routes, Navigate }  from 'react-router-dom'
import List from "./pages/List/List";
import Hotel from "./pages/Hotel/Hotel";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess";
import PaymentFail from "./pages/PaymentFail/PaymentFail";
import { useSelector } from "react-redux";
function App() {
  const user = useSelector((state)=>(state.user));
  // console.log("LINE AT 11" , user);
  return (
    <>
    
    <Router>
      <Routes>
        <Route exact path="/" element={user.currentUser ?<Home/> : <Navigate to ="/login"/>} />
        <Route path="/list" element={<List/>} />
        <Route path="/hotel/:id" element={ <Hotel/>} />
        <Route path="/register" element={!user.currentUser ? <Register/> : <Navigate to="/"/>} />
        <Route path="/login" element={!user.currentUser ? <Login/> : <Navigate to="/"/>} />
        <Route path="/success" element={<PaymentSuccess/>}/>
        <Route path="/failure" element={<PaymentFail/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
