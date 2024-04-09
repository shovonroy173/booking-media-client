import "./header.css";
import HotelIcon from "@mui/icons-material/Hotel";
import FlightIcon from "@mui/icons-material/Flight";
import CarRentalIcon from "@mui/icons-material/CarRental";
import AttractionsIcon from "@mui/icons-material/Attractions";
import HailIcon from "@mui/icons-material/Hail";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BoyIcon from "@mui/icons-material/Boy";
import {useNavigate} from "react-router-dom";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { DateRangePicker } from "react-date-range";
import { useState } from "react";
import {useDispatch} from "react-redux"
import { travelDetails } from "../../redux/apiCalls";

// eslint-disable-next-line react/prop-types
const Header = ({type}) => {

  const [open, setOpen] = useState(false);
  const [openOption, setOpenOption] = useState(false);
  const [destination , setDestination] = useState("");  
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleOptions = (name, opration) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: opration === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const details = {destination , date , options};
  // console.log("LINE AT 46" , details);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSearch = ()=>{
    travelDetails(dispatch , details)
    navigate("/list" , {state: {destination , options , date}});
  }

  return (
    <div className="header">
      <div className="headerContainer">
        <div className="headerList">
          <div className="headerListItem active">
            <HotelIcon />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FlightIcon />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <CarRentalIcon />
            <span>Car Rental</span>
          </div>
          <div className="headerListItem">
            <AttractionsIcon />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <HailIcon />
            <span>Airport Taxis</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <div className="headerText">
              <h1 className="headerLgText">Find your next stay</h1>
              <p className="headerSmText">
                Search deals on hotels, homes, and much more...
              </p>
            </div>
            <div className="headerSearch">
              <div className="headerSearchItem">
                {" "}
                <HotelIcon />
                <input
                  type="text"
                  placeholder="Where are going?"
                  className="headerSearchInput"
                  onChange={((e)=>(setDestination(e.target.value )))}
                />
              </div>
              <div className="headerSearchItem">
                {" "}
                <CalendarMonthIcon />
                <span
                  className="headerSearchInput"
                  onClick={() => setOpen(!open)}
                >
                  {`${format(date[0].startDate, "dd/MM/yy")} to ${format(
                    date[0].endDate,
                    "dd/MM/yyyy"
                  )}`}
                </span>
                {open && (
                  <DateRangePicker
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <BoyIcon />
                <span
                  className="headerSearchInput"
                  onClick={() => setOpenOption(!openOption)}
                >
                  {`${options.adult} adult ${options.children} children ${options.room} room`}
                </span>
                {openOption && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOptions("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton "
                          onClick={() => handleOptions("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOptions("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton "
                          onClick={() => handleOptions("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOptions("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton "
                          onClick={() => handleOptions("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <button className="headerSearchBtn" onClick={handleSearch}>Search</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
