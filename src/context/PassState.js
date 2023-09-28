import React, { useState } from "react";
import PassContext from "./passContext";

const PassState = (props) => {
  const [passwords, setpasswords] = useState([]);

  // Get all passwords
  const getPasswords = async () => {
    const url = "http://127.0.0.1:8000/api/password/passwords/";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    const json = await response.json();
    setpasswords(json);
  };

  // Add a password
  const addPassword = async (username, passwordOfWebsite, notes, website) => {
    const url = "http://127.0.0.1:8000/api/password/passwords/";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ username, passwordOfWebsite, notes, website }),
    });
    const password = await response.json();
    setpasswords(passwords.concat(password));
  };

  // Delete a password
  const deletePassword = async (id) => {
    const url = `http://127.0.0.1:8000/api/password/passwords/${id}/`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    const json = await response.json();
    console.log(json);

    const newPasswords = passwords.filter((pass) => {
      return pass.id !== id;
    });
    setpasswords(newPasswords);
  };

  //  Edit a password
  const editPassword = async (
    id,
    username,
    website,
    passwordOfWebsite,
    notes
  ) => {
    const url = `http://127.0.0.1:8000/api/password/passwords/${id}/`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ username, passwordOfWebsite, notes, website }),
    });
    const json = await response.json();
    console.log(json);

    let newPasswords = JSON.parse(JSON.stringify(passwords));

    // Logic to edit a password
    for (let index = 0; index < newPasswords.length; index++) {
      const element = newPasswords[index];
      if (element.id === id) {
        element.username = username;
        element.passwordOfWebsite = passwordOfWebsite;
        element.notes = notes;
        element.website = website;
        break;
      }
    }
    setpasswords(newPasswords);
  };

  return (
    <PassContext.Provider
      value={{
        passwords,
        setpasswords,
        addPassword,
        getPasswords,
        deletePassword,
        editPassword,
      }}
    >
      {props.children}
    </PassContext.Provider>
  );
};

export default PassState;
