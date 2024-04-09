import "./list.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import axios from "axios";
import { travelDetails } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [list, setList] = useState([]);
  const [wait, setWait] = useState(true);
  const details = {destination , date , options , minPrice , maxPrice};
  console.log(details);

  useEffect(() => {
    const getList = async () => {
      const res = await axios.get(
        `https://booking-media-api.onrender.com/api/hotel?city=${destination}&min=${
          minPrice || 0
        }&max=${maxPrice || 999}`
      );
      setWait(false);
      setList(res.data);
    };
    getList();
  }, [destination, minPrice, maxPrice]);
  const getList = async () => {
    const res = await axios.get(
      `https://booking-media-api.onrender.com/api/hotel?city=${destination}&min=${
        minPrice || 0
      }&max=${maxPrice || 999}`
    );
    setWait(false);
    setList(res.data);
  };
  
  const handleClick = ()=>{
    getList();
  }
  console.log("LINE AT 49" , list );
  const dispatch = useDispatch();
  useEffect(()=>{
    travelDetails(dispatch , details);
  } , [dispatch , details]);

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination} type="text" onChange={((e)=>(setDestination(e.target.value)))} />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {wait ? (
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={open}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            ) : (
              <>
                {list.map((item) => {
                  return (
                    <>
                    <SearchItem item={item} key={item._id} details={details} />
</>
                  )
                })}
              </>
            )}

            {/* <SearchItem/>
          <SearchItem/>
          <SearchItem/>
          <SearchItem/>
          <SearchItem/>
          <SearchItem/>
          <SearchItem/> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
