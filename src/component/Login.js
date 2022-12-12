import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credential, SetCredentail] = useState({ email: "", password: "" });
  let history = useNavigate();
  // Arrow Function
  const handaleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save The authToken And Redirect
      localStorage.setItem("token", json.authtoken);
      props.showAlert("Loggin Successfully...!", "success");
      history("/");
    } else {
      props.showAlert("Invalid Details...!", "danger");
    }
  };

  const onChange = (e) => {
    SetCredentail({ ...credential, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container mt-5">
        <h2>Login To iNoteBook</h2>
        <form onSubmit={handaleSubmit}>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              value={credential.email}
              onChange={onChange}
              id="email"
              name="email"
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
              value={credential.password}
              onChange={onChange}
              id="password"
              name="password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-dark btn-lg btn-block"
            style={{ width: "100%" }}
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
