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

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div>
        <NavBar />
      </div>

      <div class="text-white ml-28 mt-32">
        <pre class="text-3xl leading-[3rem]">Create an Account{"\n"}</pre>

        <pre class="leading-[2.75rem]">{"\n"}</pre>

        {/* username */}
        <label id="email_label">
          <input type="text" class="bg-gray" placeholder=" " id="email" />
          <span id="email_span"> Email </span>
        </label>

        <pre class="leading-[2.5rem]">{"\n"}</pre>

        {/* username */}
        <label id="username_label">
          <input type="text" class="bg-gray" placeholder=" " id="username" />
          <span id="username_span"> Username </span>
        </label>

        <pre class="leading-[2.5rem]">{"\n"}</pre>

        {/* password */}
        <div>
          <label id="user_password_label">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              class="user_password bg-gray"
              placeholder=" "
              id="user_password"
            />

            <span id="user_password_span"> Password </span>

            <PasswordStrengthBar password={password} />
          </label>
        </div>
      </div>

      <div>
        <button
          id="button"
          type="checkbox"
          value={showPassword}
          onClick={() => setShowPassword((prev) => !prev)}
          class="absolute text-white ml-[24rem] mt-[-4.3rem]"
        >
          {showPassword ? <Icon icon={eye} /> : <Icon icon={eyeOff} />}
        </button>
      </div>

      <ul class="btn btn-active btn-link text-light-yellow text-xl ml-[42rem]  mt-[3.5rem] mb-[10rem]">
        Create Account→
      </ul>
    </div>
  );
}



