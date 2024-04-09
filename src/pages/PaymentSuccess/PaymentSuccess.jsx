import Navbar from "../../components/navbar/Navbar";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import "./paymentSuccess.css";
const PaymentSuccess = () => {
  return (
    <div>
      <Navbar/>
      <div className="sContainer">
        <p className="sText">
          Payment Successfully done!
        </p>
        <button className="sBtn">
          Go To Home
        </button>
      
      <MailList/>
      <Footer/>
      </div>
    </div>
  )
}

export default PaymentSuccess

