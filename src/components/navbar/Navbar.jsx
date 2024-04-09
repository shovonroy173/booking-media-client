import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";
import "./navbar.css";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { loginOut } from "../../redux/apiCalls";
import { useEffect, useState } from "react";
import axios from "axios";
const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [loggedUser, setLoggedUser] = useState({});
  const bookings = loggedUser?.bookings;
  console.log("LINE AT 17", bookings);
  console.log("LINE AT 18", hotels);

  const handleClick = () => {
    loginOut(dispatch);
  };
  console.log("LINE AT 16" , user );
  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(
        `https://booking-media-api.onrender.com/api/auth/find/${user?.currentUser?._id}`
      );
      setLoggedUser(res.data);
    };

    getUser();
  }, [user]);

  const fetchHotels = async (bookings) => {
    try {
      const hotelPromises = bookings.map(async (item) => {
        const res = await axios.get(
          `https://booking-media-api.onrender.com/api/hotel/find/${item?.hotelId?.id}`
        );
        return res.data;
      });

      const resolvedHotels = await Promise.all(hotelPromises);
      setHotels(resolvedHotels);
    } catch (error) {
      console.error("Error fetching hotels:", error);
      // Handle error
    }
  };
  const handleUserClick = () => {
    setOpen(!open);
    fetchHotels(bookings);
  };

  const handleDelete = (hotelId)=>{
    const bookingDel = async()=>{
      await axios.put(`https://booking-media-api.onrender.com/api/auth/delete/${hotelId}/${user?.currentUser?._id}`);
      
    }
    const clearDates = bookings.map(async (item) => {
      await axios.put(
        `https://booking-media-api.onrender.com/api/room/booked/${item?.selectedRooms[0]}`
      );
      
      
    });
    try {
      bookingDel();
      clearDates();
console.log("OK");
    } catch (error) {
      console.log(error);
    }
window.location.reload()
    

  };
  return (
    <div className="navbar">
      <div className="navContainer">
        {open && (
          <>
            <div className="reserve">
              <div className="rContainer">
                <CancelIcon className="rClose" onClick={() => setOpen(false)} />
                {(hotels.length !== 0) ? 
              <>
               {hotels.map((hotel) => {
                  return (
                    <>
                      <div className="rItem">
                        <div className="rItemInfo">
                          <DeleteIcon
                            className="rItemDel"
                            onClick={()=>(handleDelete(hotel._id))}
                          />
                          <div className="rTitle">{hotel.name}</div>
                          <div className="rDesc">
                            {hotel.address} , {hotel.city}
                          </div>
                          <div className="rDesc">
                            Per night : ${hotel.cheapestPrice} , Rating :{" "}
                            {hotel.rating}
                          </div>
                          <div className="rDesc">Paid Successfully!</div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </> 
              :
              <p className="rNoBookingText">No Bookings Yet! Do it now!!</p>
              
              }
               
              </div>
            </div>
          </>
        )}

        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <span className="logo">booking-media</span>
        </Link>
        <div className="navItems">
          {user.currentUser ? (
            <>
              <Avatar className="avatar" onClick={handleUserClick}>
                {user.currentUser.name[0].toUpperCase()}
              </Avatar>
              <LogoutIcon onClick={handleClick} />
            </>
          ) : (
            <>
              <Link to="register">
                <button className="navButton">Register</button>
              </Link>
              <Link to="/login">
                <button className="navButton">Login</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
