import React, { useEffect, useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import passContext from "../context/passContext";
import PasswordItem from "./PasswordItem";

export default function Passwords(props) {
  const { getPasswords, passwords, editPassword } = useContext(passContext);
  const navigate = useNavigate();

  const [password, setPassword] = useState({
    username: "",
    passwordOfWebsite: "",
    notes: "",
    website: "",
  });

  const handleClick = (e) => {
    editPassword(
      password.id,
      password.username,
      password.website,
      password.passwordOfWebsite,
      password.notes
    );
    refClose.current.click();
    props.showAlert("Updated Successfully", "success");
  };
  const onChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getPasswords();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const editpassword = (password) => {
    ref.current.click();
    setPassword(password);
  };

  return (
    <>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      ></button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Password
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="website" className="form-label">
                    Website
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="website"
                    name="website"
                    onChange={onChange}
                    value={password.website}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    onChange={onChange}
                    value={password.username}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="passwordOfWebsite" className="form-label">
                    Password
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="passwordOfWebsite"
                    name="passwordOfWebsite"
                    onChange={onChange}
                    value={password.passwordOfWebsite}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="notes" className="form-label">
                    Notes
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="notes"
                    name="notes"
                    onChange={onChange}
                    value={password.notes}
                  />
                </div>
              </form>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={refClose}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleClick}
                  disabled={
                    password.passwordOfWebsite === "" ||
                    password.username === "" ||
                    password.website === ""
                  }
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <h2 className="my-3">Your Passwords</h2>
        {passwords.length === 0 && "No passwords to display"}
      </div>
      <div className="row">
        {passwords.map((pass) => {
          return (
            <PasswordItem
              password={pass}
              key={pass.id}
              editpassword={editpassword}
              showAlert={props.showAlert}
            />
          );
        })}
      </div>
    </>
  );
}
