import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://127.0.0.1:8000/api/user/login/";
    const data = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });
    const response = await data.json();
    if (response.token) {
      localStorage.setItem("token", response.token);
      localStorage.setItem("email", response.email);
      props.showAlert("Logged in successfully", "success");
      navigate("/");
    } else if (response.otpError) {
      localStorage.clear();
      props.showAlert("OTP not verified", "danger");
      navigate("/signup");
    } else {
      localStorage.clear();
      props.showAlert("Invalid credentials", "danger");
    }
  };
  return (
    <div className="container my-4">
      <h2>Login to continue to PassTitan</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            required
          />
          <div id="email" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
