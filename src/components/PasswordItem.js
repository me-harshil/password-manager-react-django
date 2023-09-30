import React, { useContext, useState } from "react";
import passContext from "../context/passContext";

export default function PasswordItem(props) {
  const { deletePassword } = useContext(passContext);
  let { username, website, notes, passwordOfWebsite } = props.password;
  const style = {
    cursor: "pointer",
  };

  const [isEyeVisible, setIsEyeVisible] = useState(true);

  const toggleEyeVisibility = () => {
    setIsEyeVisible(!isEyeVisible);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(passwordOfWebsite);
    props.showAlert("Password Copied", "success");
  };

  const copyUsername = () => {
    navigator.clipboard.writeText(username);
    props.showAlert("Username Copied", "success");
  };
  const linkToWebsite = `https://${website}`
  return (
    <tr>
      <th scope="row">{props.index}</th>
      <td>
        <a href={linkToWebsite} target="_blank" rel="noopener noreferrer" className="">
          {website}
        </a>
      </td>
      <td>
        {username}
        <i
          className="fa-solid fa-copy ps-2"
          onClick={copyUsername}
          style={style}
        ></i>
      </td>
      <td>
        {!isEyeVisible
          ? passwordOfWebsite
          : "•".repeat(passwordOfWebsite.length)}
        <i
          className={`fa-solid ${
            isEyeVisible ? "fa-eye" : "fa-eye-slash"
          } ps-2`}
          onClick={toggleEyeVisibility}
          style={style}
        ></i>
        <i
          className="fa-solid fa-copy ps-2"
          onClick={copyPassword}
          style={style}
        ></i>
      </td>
      <td>{notes}</td>
      <td>
        <i
          className="fa-solid fa-trash mx-2"
          onClick={() => {
            deletePassword(props.password.id);
            props.showAlert("Deleted Successfully", "success");
          }}
          style={style}
        ></i>
        <i
          className="fa-solid fa-pen-to-square mx-2"
          onClick={() => {
            props.editpassword(props.password);
          }}
          style={style}
        ></i>
      </td>
    </tr>
  );
}
