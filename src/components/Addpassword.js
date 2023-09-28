import React, { useContext, useState } from "react";
import passContext from "../context/passContext";

export default function Addpassword(props) {
  const { addPassword } = useContext(passContext);

  const [password, setPassword] = useState({
    username: "",
    password: "",
    notes: "",
    website: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addPassword(password.username, password.password, password.notes, password.website);
    setPassword({ username: "", password: "", notes: "", website: "" });
    props.showAlert("Note Added Successfully", "success");
  };

  const onChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container">
      <h2 className="my-3">Add Password</h2>
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
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="text"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            value={password.password}
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
        <button
          disabled={password.password === "" || password.username === "" || password.website === ""}
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
        >
          Add Password
        </button>
      </form>
    </div>
  );
}
