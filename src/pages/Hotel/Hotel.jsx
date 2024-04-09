import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "./hotel.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Reserve from "../../components/reserve/Reserve";

// const photos = [
//   {
//     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
//   },
//   {
//     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
//   },
//   {
//     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
//   },
//   {
//     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
//   },
//   {
//     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
//   },
//   {
//     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
//   },
// ];

const Hotel = () => {
  const hotelId = useParams();
  const navigate = useNavigate();
  // console.log("LINE AT 30" , location);
  // console.log("LINE AT 32" , hotelId);

  const [hotel , setHotel] = useState({});
  const [wait , setWait] = useState(true);
  const [openModal , setOpenModal] = useState(false);
  const user = useSelector((state)=>(state.user));

  const details = useSelector((state)=>(state.travel));
  const dates = details?.currentTravel?.date;
  const MILISECONDS_PER_DAY = 1000*60*60*24;
  function dayDifference (date2 , date1){
    const timeDiff = Math.abs((date2).getTime() - (date1).getTime());
    const day_Diff = Math.ceil(timeDiff / MILISECONDS_PER_DAY);
    return day_Diff;
  }
  const date2 = new Date(dates[0].endDate);
  const date1 = new Date(dates[0].startDate);
  const days = dayDifference( date2 , date1); 

  const handleClick = ()=>{
    if(user.currentUser){
      setOpenModal(true);
    }
    else{
      navigate("/");
    }
  }
  useEffect(()=>{
    const getHotel = async()=>{
      const res = await axios.get(`https://booking-media-api.onrender.com/api/hotel/find/${hotelId?.id}`);
      setWait(false);
      setHotel(res.data);
    };
    getHotel();
  } , [hotelId]);
  // console.log("LINE AT 55" , hotel);

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {wait ? 
    <>
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>  
    :
    <>
    <div className="listContainer">
        <div className="hotelWrapper">
          <h1 className="hotelTitle">{hotel?.name}</h1>
          <div className="hotelAddress">
            <LocationOnIcon />
            <span>{hotel?.address}</span>
          </div>
          <span className="hotelDistance">
            Excellent location – {hotel?.distance} from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over ${hotel?.cheapestPrice} per night at this property and get a free airport taxi
          </span>
          <div className="hotelImages">
            {hotel?.photos?.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  // onClick={() => handleOpen(i)}
                  src={photo}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{hotel?.title}</h1>
              <p className="hotelDesc">
                {hotel?.desc}
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for {days} nights stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of {hotel?.rating}!
              </span>
              <h2>
                <b>${days*`${hotel?.cheapestPrice}`}</b> ({days} nights)
              </h2>
              <button onClick={handleClick}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
      </div>
    </>
    }
    {openModal && <Reserve setOpen={setOpenModal} hotelId={hotelId} price={days*`${hotel?.cheapestPrice}`}/>}
      
    </div>
  );
};

export default Hotel;
