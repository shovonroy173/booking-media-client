import "./featuredProperties.css";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const FeaturedProperties = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [wait, setWait] = useState(true);
  useEffect(() => {

    const getHotel = async () => {
      const res = await axios.get(
        "https://booking-media-api.onrender.com/api/hotel?featured=true&limit=4"
      );
      setWait(false)
      setFeaturedProperties(res.data);
    };
    getHotel();
  }, []);

  // console.log("LINE AT 22", featuredProperties);

  return (
    <div className="fp">
      {wait ? 
      (<Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        
      >
        <CircularProgress color="inherit" />
      </Backdrop> ) : 
      (<>
      {featuredProperties?.map((item , index) => {
        return (
          <>
            <Link
              to={`/hotel/${item?._id}`}
                
                
                state={item}
              
              style={{ textDecoration: "none", color: "inherit" }}
              key={index}
             
            >
              <div className="fpItem">
                <img src={item?.featuredPhoto} alt="" className="fpImg" />
                <div className="fpDetails">
                  <div className="fpDetail">
                    <span className="fpName">{item?.name}</span>
                    <span className="fpCity">{item?.city}</span>
                    <div className="fpRating">
                      <button>{item?.rating}</button>
                      <span>{`${
                        item?.rating >= 4.5
                          ? `Excellent`
                          : item?.rating >= 4
                          ? `Best`
                          : "Good"
                      }`}</span>
                    </div>
                  </div>
                  <span className="fpPrice">
                    Starting from <span>${item?.cheapestPrice}</span>
                  </span>
                </div>
              </div>
            </Link>
          </>
        );
      })}
      </>)
       }
      
    </div>
  );
};

export default FeaturedProperties;
