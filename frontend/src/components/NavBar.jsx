import React, { useContext, useState, useEffect } from "react";
import "../../dist/output.css";
import "./Images.css";
import { Context } from "../components/Context.jsx";

import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn, savedUser, setSavedUser } =
    useContext(Context);

  const [trucks, setTrucks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        await fetch("http://localhost:3000/alltrucknames")
          .then((data) => {
            return data.json();
          })
          .then((post) => {
            setTrucks(post);
            setLoading(false);
          });
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(trucks);

  const handleClick = (truckname) => {
    navigate("/truckpage", { state: truckname });
  };

  const loggedInRoute = (event) => {
    fetch("http://localhost:3000/users/" + savedUser)
      .then((data) => {
        return data.json();
      })
      .then((post) => {
        console.log(post);
        navigate("/dashboard", { state: post });
      });
  };

  const logOut = (event) => {
    setLoggedIn(false);
    setSavedUser("");
    navigate("/");
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

        <a className="btn bg-transparent border-none">
          <Link to="/locations"> At a Glance </Link>
        </a>

        <div className="dropdown dropdown-hover">
          <label tabIndex={0} className="btn bg-transparent border-none">
            {" "}
            Trucks{" "}
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
          {loggedIn ? (
            <div>
              <ul
                className="btn bg-transparent border-none "
                onClick={loggedInRoute}
              >
                Dashboard
              </ul>
              <ul
                className="text-black btn btn-active btn-link"
                onClick={logOut}
              >
                Logout
              </ul>
            </div>
          ) : (
            <Link to="/login">
              <ul className="btn btn-active btn-link">Login</ul>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
