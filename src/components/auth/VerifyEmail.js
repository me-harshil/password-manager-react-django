import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail(props) {


  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };
  const userEmail = localStorage.getItem("email");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://127.0.0.1:8000/api/user/verify-email/";
    const data = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        otp: otp,
      }),
    });
    const response = await data.json();
    if (response.status === "success") {
      props.showAlert("Email verified successfully", "success");
      navigate("/");
    } else {
      props.showAlert("Incorrect OTP", "danger");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="otp" className="form-label">
          Enter 6 digit OTP sent to {userEmail}
        </label>
        <input
          type="text"
          className="form-control"
          id="otp"
          name="otp"
          value={otp}
          onChange={handleOtpChange}
          maxLength={6}
          required
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        disabled={otp.length < 6}
      >
        Verify OTP
      </button>
    </form>
  );
}
