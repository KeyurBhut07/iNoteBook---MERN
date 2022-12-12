import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credential, SetCredentail] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let history = useNavigate();
  const handaleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credential;
    const response = await fetch("http://localhost:4000/api/v1/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save The authToken And Redirect
      localStorage.setItem("token", json.authtoken);
      history("/login");
      props.showAlert("Register Successfully...!", "success");
    } else {
      props.showAlert("Invalid Credential...!", "danger");
    }
  };

  const onChange = (e) => {
    SetCredentail({ ...credential, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container mt-5">
        <h2>Register To iNoteBook</h2>
        <form onSubmit={handaleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={onChange}
              aria-describedby="emailHelp"
            />
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
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="cpassword"
              name="cpassword"
              onChange={onChange}
              minLength={5}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-dark btn-lg btn-block"
            style={{ width: "100%" }}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
