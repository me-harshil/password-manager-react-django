import React, { useContext } from "react";
import passContext from "../context/passContext";

export default function PasswordItem(props) {
  const { deletePassword } = useContext(passContext);
  let { username, website, notes, passwordOfWebsite } = props.password;
  return (
    // <div className="col-md-3 my-2">
    //   <div className="card">
    //     <div className="card-body">
    //       <h5 className="card-title">{username}</h5>
    //       <p className="card-text">{website}</p>
    //       <p className="card-text">{passwordOfWebsite}</p>
    //       <p className="card-text">{notes}</p>
    //       <i
    //         className="fa-solid fa-trash mx-2"
    //         onClick={() => {
    //           deletePassword(props.password.id);
    //           props.showAlert("Deleted Successfully", "success");
    //         }}
    //       ></i>
    //       <i
    //         className="fa-solid fa-pen-to-square mx-2"
    //         onClick={() => {
    //           props.editpassword(props.password);
    //         }}
    //       ></i>
    //     </div>
    //   </div>
    // </div>
    <div className="container">
      <table className="table table-striped table-hover">

      </table>
    </div>
  );
}
