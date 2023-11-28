import React from "react";
import NavBar from "../components/NavBar.jsx";
import "../../dist/output.css";
import "../components/Inputs.css";
import { useState } from "react";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import PasswordStrengthBar from "react-password-strength-bar";
import PasswordChecklist from "react-password-checklist";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [inputs, setInputs] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const emailInput = document.getElementById("email");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // TODO: ADD within if statement a check that email isn't already taken up in database
    if (emailInput !== null && emailInput.validity.valid) {
      console.log(inputs);
      const username = inputs.username;
      navigate("/dashboard", { state: { username } });
    } else {
      // alert("not a valid email");
      setShowMessage(true);
    }
  };

  const setPasswordView = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <NavBar />
      </div>

      <div class="text-white ml-28 mt-32">
        <pre class="text-3xl leading-[3rem]">Create an Account{"\n"}</pre>

        <pre class="leading-[2.75rem]">{"\n"}</pre>

        {/* username */}
        <label id="email_label">
          <input
            type="email"
            className="bg-gray"
            placeholder=" "
            id="email"
            name="email"
            value={inputs.email || ""}
            onChange={handleChange}
          />
          <span id="email_span"> Email </span>
          {showMessage ? <span id="message"> X Not a Valid Email </span> : null}
        </label>

        <pre class="leading-[2.5rem]">{"\n"}</pre>

        {/* username */}
        <label id="username_label">
          <input
            type="text"
            className="bg-gray"
            placeholder=" "
            id="username"
            name="username"
            value={inputs.username || ""}
            onChange={handleChange}
          />
          <span id="username_span"> Username </span>
        </label>

        <pre class="leading-[2.5rem]">{"\n"}</pre>

        {/* password */}
        <div>
          <label id="user_password_label">
            <input
              type={showPassword ? "text" : "password"}
              value={inputs.password || ""}
              onChange={handleChange}
              className="bg-gray"
              name="password"
              placeholder=" "
              id="user_password"
            />

            <span id="user_password_span"> Password </span>

            <PasswordStrengthBar password={inputs.password} />
          </label>
        </div>

        <div>
          <button
            id="button"
            type="button"
            value={showPassword}
            onClick={setPasswordView}
            class="absolute text-white ml-[17rem] mt-[-4.3rem]"
          >
            {showPassword ? <Icon icon={eye} /> : <Icon icon={eyeOff} />}
          </button>
        </div>
      </div>

      {/* TODO: Pass in username into the dashboard, also must check within database it is new user */}
      <ul
        type="submit"
        onClick={handleSubmit}
        class="bg-white btn btn-active btn-link text-light-yellow text-xl ml-[42rem] mt-[3.5rem] mb-[10rem]"
      >
        Create Account→
      </ul>
    </form>
  );
}



