import React from "react";
import NavBar from "../components/NavBar.jsx";
import '../../dist/output.css'
import "../components/Images.css";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="ps-1rem">
      <div>
        <NavBar />
      </div>

      <div className="absolute ps-[36rem] pt-[12rem]">
        <img src="../../images/ucla-food-prep.png" className="homeimg"></img>
      </div>

      <div className="text-white text-4xl ps-[5rem]">
        <pre className="mt-60"> Your one-stop shop for</pre>
        <pre className="ps-24 mt-[5.5rem] mb-60"> UCLA dining reviews.</pre>
      </div>

      <div className="text-black bg-light-yellow ps-24 py-7 my-40 leading-[2rem]">
        <pre className="text-2xl font-bold leading-[2rem] pt-[1rem]">
          Our goals{"\n\n"}
        </pre>

        <pre className="leading-[2rem]">
          We believe in simplifying food for Bruins. {"\n"}{" "}
        </pre>
        <pre className="leading-[1rem]">How we do this? {"\n\n"} </pre>
        <pre className="leading-[2rem]">
          By helping Bruins help Bruins navigate on-campus dining.{"\n"}
          We offer a digital space for students to review UCLA’s food {"\n"}
          trucks and benefit current and future students alike.
        </pre>

        <ul className="btn btn-active btn-link text-black text-xl ml-[42rem] mt-[5.5rem] mb-[1.5rem]">
          <Link to="/login">Begin→ </Link>
        </ul>
      </div>
    </div>
  );
}