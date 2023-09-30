import React from "react";
import logo from "./logo-no-background.png";

const About = () => {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-6">
          <h2>About PassTitan</h2>
          <p>
            PassTitan is a powerful and secure password management solution that
            helps you store and manage your passwords with ease and peace of
            mind.
          </p>
          <p>
            Our mission is to provide users with a reliable tool to organize
            their passwords securely, ensuring their digital identities are
            protected at all times.
          </p>
          <p>
            With PassTitan, you can access passwords securely whenever you need.
          </p>
        </div>
        <div className="col-lg-6">
          <img
            src={logo} 
            alt="PassTitan Logo"
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
