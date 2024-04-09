import axios from "axios";
import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import "./featured.css";

const Featured = () => {
  const [cities, setCities] = useState([]);
  const [wait, setWait] = useState(true);

  useEffect(() => {
    const getCityProperty = async () => {
      const res = await axios.get("https://booking-media-api.onrender.com/api/city/");
      setWait(false);
      setCities(res.data);
    };
    getCityProperty();
  }, []);

  // console.log("LINE AT 17", cities);
  return (
    <>
      {wait ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <div className="featured">
          {cities?.map((city) => {
            return (
              <>
                <div className="featuredItem">
                  <img src={city?.img} alt="img" className="featuredImg" />
                  <div className="featuredTitles">
                    <h1>{city?.name}</h1>

                    <h2>{city?.properties} properties</h2>
                  </div>
                </div>
                
              </>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Featured;
