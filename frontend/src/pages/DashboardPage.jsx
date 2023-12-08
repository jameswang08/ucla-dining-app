import React, { useContext, useState, useEffect } from "react";
// import { useState } from "react";
import NavBar from "../components/NavBar.jsx";
import BottomBar from "../components/BottomBar.jsx";
import "../../dist/output.css";
import "../components/grid.css";
import { useLocation } from "react-router-dom";
import { Context } from "../components/Context.jsx";
import { Icon } from "react-icons-kit";
import { arrowSortedDown } from "react-icons-kit/typicons/arrowSortedDown";
import UserReviews from "../components/UserReviews.jsx";

export default function DashboardPage() {
  const user = useLocation().state;
  const firstname = user.name.first;
  const lastname = user.name.last;
  const reputation = user.reputation;
  const [favorite, setFavorite] = useState(user.favorite);

  const [trucks, setTrucks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [sort, setSort] = useState("");
  const [appliedFilters, setAppliedFilters] = useState([]);

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

  const handleClick = (truck) => {
    setFavorite(truck);
    fetch("http://localhost:3000/setfavorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.username,
        favorite: truck,
      }),
    })
      .then((response) => response.json())
      .catch((error) => console.error("Error:", error));
  };

  const mystyle = {
    //padding: "1px 175px 1px 0px",
    paddingRight: "11.875rem",
    margin: "auto auto 40px auto", //top, right, bottom, left are the last 2
    height: "36px",
    minHeight: "36px",
    textTransform: "none",
  };

  return (
    <div>
      <div>
        <NavBar />
      </div>

      <div className="prose text-white ps-32 pt-20 pb-16">
        <h1 className="text-white mb-3">
          {" "}
          {firstname} {lastname}'s Dashboard
        </h1>
        <pre className="px-10 mr-24">Take a look at your activity</pre>
      </div>

      <div className="column ps-36 text-white text-lg">
        <pre>Favorite Location: </pre>

        <br className="py-10" />

        <div className="dropdown">
          {/* <pre className="px-10 py-1 rounded-sm w-[20rem] bg-gray text-white">
            {favorite}{" "}
          </pre> */}
          {/* mt-[-2rem] mb-[3rem] */}
          <label
            tabIndex={0}
            className="text-white rounded-sm w-[20rem] btn bg-gray border-none"
            style={mystyle}
          >
            {" "}
            {favorite}{" "}
          </label>
          <span>
            <Icon
              icon={arrowSortedDown}
              className="absolute mx-[-3.2rem] mt-[0.15rem]"
            />{" "}
          </span>
          <ul
            tabIndex={0}
            className="mt-[-2rem] mb-[3rem] text-white dropdown-content z-[1] menu shadow p-2 bg-gray rounded-box w-[20rem]"
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

        <br />

        <pre>Reputation: </pre>

        <br />

        <pre className="px-10 py-1 rounded-sm w-[20rem] bg-gray text-white">
          {reputation}{" "}
        </pre>
      </div>

      <div className="column ps-16 text-white text-lg">
        <div>
          <pre className="text-white mt-[-2rem] mb-0 pt-8 pb-6">Reviews </pre>

          <text className="text-white">
            Sort by:
            <div className="inline-block mx-5 text-dark-yellow font-bold">
              <input
                type="radio"
                checked={sort === "latest"}
                onChange={() => {
                  setSort("latest");
                }}
              />
              Latest
              <p className="mt-[-2rem] py-0 bg-transparent inline-block text-transparent">
                {" "}
                space
              </p>
              <input
                type="radio"
                checked={sort === "earliest"}
                onChange={() => {
                  setSort("earliest");
                }}
              />
              Earliest
              <p className="mt-[-2rem] py-0 bg-transparent inline-block text-transparent">
                {" "}
                space
              </p>
              <input
                type="radio"
                checked={sort === "popularity"}
                onChange={() => {
                  setSort("popularity");
                }}
              />
              Popularity
              <p className="mt-[-2rem] py-0 bg-transparent inline-block text-transparent">
                {" "}
                space
              </p>
            </div>
          </text>
          <text className="inline-block text-white">
            Filter by:
            <div className="inline-block text-dark-yellow font-bold">
              <p className="mt-[-2rem] py-0 bg-transparent inline-block text-transparent">
                {" "}
                space
              </p>
              <input
                type="checkbox"
                defaultChecked={false}
                onClick={() => {
                  console.log("Clicked", appliedFilters);
                  const tempArr = [...appliedFilters];
                  const index = tempArr.indexOf("lunch");
                  if (index === -1) {
                    // Element is not in the array, so add it
                    tempArr.push("lunch");
                  } else {
                    // Element is in the array, so remove it
                    tempArr.splice(index, 1);
                  }
                  setAppliedFilters(tempArr);
                }}
              />
              Lunch
              <p className="mt-[-2rem] py-0 bg-transparent inline-block text-transparent">
                {" "}
                space
              </p>
              <input
                type="checkbox"
                defaultChecked={false}
                // className="text-dark-yellow btn btn-active btn-link my-0"
                onClick={() => {
                  const tempArr = [...appliedFilters];
                  const index = tempArr.indexOf("dinner");
                  if (index === -1) {
                    // Element is not in the array, so add it
                    tempArr.push("dinner");
                  } else {
                    // Element is in the array, so remove it
                    tempArr.splice(index, 1);
                  }
                  setAppliedFilters(tempArr);
                }}
              />
              Dinner
              <p className="mt-[-2rem] py-0 bg-transparent inline-block text-transparent">
                {" "}
                space
              </p>
              <input
                type="checkbox"
                defaultChecked={false}
                // className="text-dark-yellow btn btn-active btn-link my-0"
                onClick={() => {
                  const tempArr = [...appliedFilters];
                  const index = tempArr.indexOf("lateNight");
                  if (index === -1) {
                    // Element is not in the array, so add it
                    tempArr.push("lateNight");
                  } else {
                    // Element is in the array, so remove it
                    tempArr.splice(index, 1);
                  }
                  setAppliedFilters(tempArr);
                }}
              />
              Late Night
              <p className="mt-[-2rem] py-0 bg-transparent inline-block text-transparent">
                {" "}
                space
              </p>
            </div>
          </text>
        </div>

        <br />
        <UserReviews
          user={user.username}
          sortMethod={sort}
          filters={appliedFilters}
        ></UserReviews>

        <pre className="leading-[2rem]">{"\n\n\n"}</pre>
      </div>

      <p className="bg-black text-transparent leading-[3rem]">
        placeholder {"\n\n\n"}
      </p>

      <div>
        <BottomBar />
      </div>
    </div>
  );
}
