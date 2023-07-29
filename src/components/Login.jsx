import React from "react";
import { useState } from "react";
import { useRef } from "react";

import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

import { Button } from "primereact/button";

const Login = () => {
  const toast = useRef();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const togglePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Please enter needed information.",
      life: 2500,
    });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === "" || password === "") {
      showError();
      console.log("HEEJ TU SAM");
    } else {
      console.log("Nice");
    }
  };

  return (
    <div className="loginregister">
      <Toast ref={toast} />
      <form onSubmit={handleSubmit}>
        <h6>Login</h6>
        <InputText
          value={username}
          onChange={handleUsernameChange}
          placeholder="Username"
        />
        <br />
        <span className="p-input-icon-right">
          <i
            className={isPasswordVisible ? "pi pi-eye-slash" : "pi  pi-eye"}
            onClick={togglePassword}
          />
          <InputText
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </span>
        <br />
        <button type="submit">Login</button>
      </form>

      <div className="register">
        <div className="icon">
          <i className="pi pi-user-plus" style={{ fontSize: "60px" }}></i>
        </div>

        <div className="registerLabels">
          <p>Need an account?</p>
          <a href="/Register">Register here</a>
        </div>
      </div>
    </div>
  );
};
export default Login;
