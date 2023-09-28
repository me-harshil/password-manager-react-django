import React from "react";

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
            With PassTitan, you can generate strong, unique passwords for each
            of your accounts, and access them securely whenever you need.
          </p>
        </div>
        <div className="col-lg-6">
          <img
            src="path_to_your_image" // Replace with the actual image source
            alt="PassTitan Logo"
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
