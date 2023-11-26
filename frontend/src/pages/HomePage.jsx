import React from "react";
import NavBar from "../components/NavBar.jsx";
import '../../dist/output.css'
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <div>
        <NavBar />
      </div>

      <div class="text-white text-4xl ps-24">
        <pre class="mt-60"> Your one-stop shop for</pre>
        <pre class="ps-16 mt-[5.5rem] mb-60"> UCLA dining reviews.</pre>
      </div>

      <div class="text-black bg-light-yellow ps-24 py-7 my-40 leading-[2rem]">
        <pre class="text-2xl font-bold leading-[2rem]">Our goals{"\n\n"}</pre>

        <pre class="leading-[2rem]">
          We believe in simplifying food for Bruins. {"\n"}{" "}
        </pre>
        <pre class="leading-[1rem]">How we do this? {"\n\n"} </pre>
        <pre class="leading-[2rem]">
          By helping Bruins help Bruins navigate on-campus dining.{"\n"}
          We offer a digital space for students to review UCLA’s dining {"\n"}
          halls and takeout restaurants and benefit current and future {"\n"}
          students alike.
        </pre>

        <ul className="btn btn-active btn-link text-black text-xl ml-[42rem] mt-[5.5rem] mb-[1.5rem]">
          <Link to="/login">Begin→ </Link>
        </ul>
      </div>
    </div>
  );
}