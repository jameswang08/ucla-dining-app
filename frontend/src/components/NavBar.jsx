import React from "react";
import "../../dist/output.css";
import "./Images.css";

import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  // TODO: put list of all truck names here
  let trucks = ["test_truck", "test_truck2"];

  const handleClick = (truckname) => {
    fetch("http://localhost:3000/trucks/" + truckname)
      .then((data) => {
        return data.json();
      })
      .then((post) => {
        console.log(post);
        navigate("/truckpage", { state: post });
      });
  };

  return (
    <>
      <div className="navbar bg-dark-yellow">
        <div className="flex-1">
          <a className="btn bg-transparent border-none normal-case">
            <Link to="/">
              {<img src="../../images/logo.png" className="logo"></img>}
            </Link>
          </a>
        </div>

        <div className="dropdown dropdown-hover">
          <label tabIndex={0} className="btn bg-transparent border-none">
            {" "}
            At a Glance{" "}
          </label>
          <ul
            tabIndex={0}
            className="text-black dropdown-content z-[1] menu shadow p-2 bg-base-100 rounded-box w-48"
          >
            {trucks.map((truck, index) => {
              return (
                <li onClick={() => handleClick(truck)} key={index}>
                  <a>{truck}</a>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <Link to="/login">
            <ul className="btn btn-active btn-link">Login</ul>
          </Link>
        </div>
      </div>
    </>
  );
}
