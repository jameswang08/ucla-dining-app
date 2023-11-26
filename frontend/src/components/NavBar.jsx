import React from "react";
import '../../dist/output.css'
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <div className="navbar bg-dark-yellow">
        <div className="flex-1">
          <a className="btn bg-transparent border-none normal-case text-xl">
            <Link to="/">BruinEats</Link>
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
            <li>
              <Link to="/truckpage">
                <a>Truck 1</a>
              </Link>
            </li>
            <li>
              <Link to="/truckpage">
                <a>Truck 2</a>
              </Link>
            </li>
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
};