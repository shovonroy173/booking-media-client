import CancelIcon from "@mui/icons-material/Cancel";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import {loadStripe} from '@stripe/stripe-js';


import "./reserve.css";
import { useEffect, useState } from "react";

import axios from "axios";
import { useSelector } from "react-redux";



const KEY = "pk_test_51N55v0SG4487ZVYHjPu1nZv0uWzyK13KJsIB6oxLWsfcYbuG85TG2sD31jmnAWLbE8l5NKiTXC7O5mrW1LE0YGxh00XlH0rs0X";
// console.log("LINE AT 17" , KEY);

// eslint-disable-next-line react/prop-types
const Reserve = ({ setOpen, hotelId , price}) => {
  
  const [sucbar , setSucbar] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const getRooms = async () => {
      const res = await axios.get("https://booking-media-api.onrender.com/api/room");
      setRooms(res.data);
    };
    getRooms();
  }, []);
  // console.log("LINE AT 20", rooms);
  const user = useSelector((state) => state.user);
  const userId = user?.currentUser?._id;
  const details = useSelector((state) => state.travel);
  const dates = details?.currentTravel?.date;

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

    const isAvailable = (roomNumber) => {
      const isFound = roomNumber.unavailableDates.some((date) =>
        alldates.includes(new Date(date).getTime())
      );
console.log("LINE AT 60" , isFound);
      return !isFound;
    };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  // console.log("LINE AT 59", selectedRooms);
  // const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(
            `https://booking-media-api.onrender.com/api/room/availability/${roomId}`,
            {
              dates: alldates,
              roomId: roomId,
            }
          );
          return res.data;
        })
      );
      await axios.put("https://booking-media-api.onrender.com/api/auth/user/booking", {
        hotelId,
        selectedRooms,
        userId,
      });
      setOpen(false);
      setSucbar(true);
      const stripe = await loadStripe(KEY);
      const res = await axios.post("https://booking-media-api.onrender.com/api/checkout/payment" , {
     hotelId,
        selectedRooms,
       userId,
       price
       });
      const result = stripe.redirectToCheckout({
        sessionId: res.data.id
      });
      if((await result).error){
        console.log((await result).error);
      }
      // navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="reserve">
      <div className="rContainer">
        {sucbar && (
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          Here is a gentle confirmation that your action was successful.
        </Alert>
        )}
        <CancelIcon className="rClose" onClick={() => setOpen(false)} />

        <span>Select your rooms:</span>
        {rooms?.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item?.maxPeople}</b>
              </div>
              <div className="rPrice">Price : ${item?.price}/night</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <>
                  <div className="room">
                    <label>{roomNumber.number}</label>
                    <input
                      type="checkbox"
                      value={roomNumber._id}
                      onChange={handleSelect}
                      disabled={!isAvailable(roomNumber)}
                    />
                  </div>
                </>
              ))}
            </div>
          </div>
        ))}

        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>

      </div>
    </div>
  );
};

export default Reserve;
