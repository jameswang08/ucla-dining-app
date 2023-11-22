import React from "react";
import NavBar from "../components/NavBar.jsx";
import "../../dist/output.css";

export default function CreateAccountPage() {
  return (
    <div>
      <div>
        <NavBar />
      </div>

      <div class="text-white ps-28 my-32">
        <pre class="text-3xl leading-[5rem]">Create an Account{"\n"}</pre>

        <pre class="leading-[2.75rem]">{"\n"}</pre>

        {/* username */}
        <div class="form-control w-full max-w-xs leading-[1.5rem]">
          <div class="py-1 relative mb-4" data-te-input-wrapper-init>
            <input
              type="text"
              class="peer block min-h-[auto] w-full rounded border-0
                      bg-gray px-3 py-[0.32rem]
                      leading-[1.6] outline-none 
                      transition-all duration-200 ease-linear 
                      focus:border
                      focus:placeholder:opacity-0 data-[te-input-state-active]:placeholder:opacity-100
                    motion-reduce:transition-none 
                    [&:not([data-te-input-placeholder-active])]:placeholder:opacity-100"
              id="exampleFormControlInput2"
              placeholder="Username"
            />

            <label
              for="exampleFormControlInput2"
              class="pointer-events-none absolute left-1 top-0 mb-0 max-w-[90%] origin-[0_0] 
                      truncate pt-[-1.27rem] leading-[1.6] text-transparent transition-all 
                      duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] 
                      peer-focus:text-white"
            >
              Username
            </label>
          </div>

          <pre class="leading-[1rem]">{"\n"}</pre>

          <div class="py-1 relative mb-4" data-te-input-wrapper-init>
            <input
              type="password"
              class="peer block min-h-[auto] w-full rounded border-0 
                      bg-gray px-3 py-[0.32rem]
                      leading-[1.6] outline-none 
                      transition-all duration-200 ease-linear 
                      focus:border
                      focus:placeholder:opacity-0 data-[te-input-state-active]:placeholder:opacity-100
                      motion-reduce:transition-none 
                      [&:not([data-te-input-placeholder-active])]:placeholder:opacity-100"
              id="exampleFormControlInput22"
              placeholder="Password"
            />

            <label
              for="exampleFormControlInput22"
              class="pointer-events-none absolute left-1 top-0 mb-0 max-w-[90%] 
                      origin-[0_0] truncate pt-[-1.27rem] leading-[2.15] 
                      text-transparent transition-all duration-200 ease-out 
                      peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] 
                      peer-focus:text-white
                       "
            >
              Password
            </label>
          </div>
          
        </div>
        <ul className="btn btn-active btn-link text-light-yellow text-xl ml-[33rem] my-[5.5rem]">
            Create Account→
          </ul>
      </div>

      {/* <div>
                <input type="text" id="username" class="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none" placeholder="Username" />

                <input type="password" id="password" class="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none" placeholder="Password" />
            </div> */}
    </div>
  );
}
