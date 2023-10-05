import "./App.css";
import Navbar from "./components/Navbar";
import About from "./components/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PassState from "./context/PassState";
import Alert from "./components/Alert";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import { useState } from "react";
import Home from "./components/Home";
import Footer from "./components/Footer";
import VerifyEmail from "./components/auth/VerifyEmail";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <>
      <PassState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert} />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login showAlert={showAlert} />} />
              <Route
                path="/signup"
                element={<Signup showAlert={showAlert} />}
              />
              <Route
                path="/verify-email"
                element={<VerifyEmail showAlert={showAlert} />}
              />
            </Routes>
          </div>
          <Footer />
        </Router>
      </PassState>
    </>
  );
}

export default App;
