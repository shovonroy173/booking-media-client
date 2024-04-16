import axios from "axios";
import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import "./featured.css";

const Featured = () => {
  const [cities, setCities] = useState([]);
  const [wait, setWait] = useState(true);

  // useEffect(() => {
  //   const getCityProperty = async () => {
  //     const res = await axios.get("https://booking-media-api-1.onrender.com/api/city/");
  //     setWait(false);
  //     setCities(res.data);
  //   };
  //   getCityProperty();
  // }, []);

  useEffect(() => {
    const getPhotos = async () => {
      try {
        const res = await axios.get(
          "https://api.unsplash.com/photos/random?query=city&count=3&client_id=nPU6LujRhNfLTfkNkWDIjoPJGA2yGwdaoRP94s3lvQY"
        );
        setWait(false);
        setCities(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getPhotos();
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
          {cities?.map((city, index) => {
            return (
              <>
                <div className="featuredItem" key={index}>
                  <img
                    src={city?.urls?.raw}
                    alt="img"
                    className="featuredImg"
                  />
                  <div className="featuredTitles">
                    <h1>{city?.description}</h1>

                    {/* <h2>{city?.properties} properties</h2> */}
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
