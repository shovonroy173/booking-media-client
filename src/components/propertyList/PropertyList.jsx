import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useEffect, useState } from "react";
import "./propertyList.css";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [wait, setWait] = useState(true);
  useEffect(() => {
    const getProperty = async () => {
      const res = await axios.get(
        "https://booking-media-api.onrender.com/api/hotel/countByType"
      );
      setWait(false);
      setProperties(res.data);
    };
    getProperty();
  }, []);
  // console.log(properties);
  properties?.map((pro) => {
    console.log(pro?.count);
  });
  return (
    <div className="pList">
      {wait ? (
        <>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </>
      ) : (
        <>
          {properties?.map((item) => {
            return (
              <>
                <div className="pListItem">
                  <img src={item?.photo} alt="" className="pListImg" />
                  <div className="pListTitles">
                    <h1>
                      {`${
                        item.type.charAt(0).toUpperCase() + item.type.slice(1)
                      }`}
                      s
                    </h1>
                    <h2>
                      {item?.count} {item?.type}s
                    </h2>
                  </div>
                </div>
              </>
            );
          })}
        </>
      )}

      {/* <div className="pListItem">
        <img
          src="https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o="
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Hotels</h1>
          <h2>233 hotels</h2>
        </div>
      </div>
      <div className="pListItem">
        <img
          src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Apartments</h1>
          <h2>2331 hotels</h2>
        </div>
      </div>
      <div className="pListItem">
        <img
          src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Resorts</h1>
          <h2>2331 hotels</h2>
        </div>
      </div>
      <div className="pListItem">
        <img
          src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Villas</h1>
          <h2>2331 hotels</h2>
        </div>
      </div>
      <div className="pListItem">
        <img
          src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg"
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>Cabins</h1>
          <h2>2331 hotels</h2>
        </div>
      </div> */}
    </div>
  );
};

export default PropertyList;
