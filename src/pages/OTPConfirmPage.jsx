import { useState } from "react";
import OTPInputForm from "../components/OTPInputForm";

function OTPConfirmPage() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleMobileNumberSubmit = (e) => {
    e.preventDefault();
    // Here you could send the mobile number to an API to send an OTP
    // For demo purposes, just show OTP input
    setShowOtpInput(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      {!showOtpInput ? (
        <form
          onSubmit={handleMobileNumberSubmit}
          style={{ textAlign: "center" }}
        >
          <h3>Enter your mobile number</h3>
          <input
            type="text"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="Mobile Number"
            style={{
              width: "250px",
              padding: "10px",
              margin: "10px 0",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              backgroundColor: "#007bff",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Send OTP
          </button>
        </form>
      ) : (
        <div>
          <h3>Enter the OTP sent to your mobile number</h3>
          <OTPInputForm length={6} />
        </div>
      )}
    </div>
  );
}

export default OTPConfirmPage;
