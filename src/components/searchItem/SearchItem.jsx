import { Link } from "react-router-dom";
import "./searchItem.css";


const SearchItem = (item  ) => {
 console.log("LINE AT 6" , item);
  
  return (
    <div className="searchItem">
      <img
        src={item?.item?.featuredPhoto}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{item?.item?.title}</h1>
        <span className="siDistance">{item?.item?.distance} center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">
          Entire studio • 1 bathroom • 21m² 1 full bed
        </span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>{`${((item?.item?.rating)>=4.5)?"Excelent": ((item?.item?.rating)>=4)?"Good":"Average" }`}</span>
          <button>{item?.item?.rating}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">${item?.item?.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotel/${item?.item?._id}`} state={item?.details}  style={{textDecoration:"none" , color:"inherit"}}>
          <button className="siCheckButton" >See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
