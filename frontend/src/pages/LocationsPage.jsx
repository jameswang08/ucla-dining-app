import React, { useContext, useState, useEffect } from "react";
import NavBar from "../components/NavBar.jsx";
import "../components/Images.css";
import "../components/headers.css";
import "../components/grid.css";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../components/Context.jsx";

export default function LocationsPage() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleClick = (truckname) => {
    navigate("/truckpage", { state: truckname });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        await fetch("http://localhost:3000/alltrucks")
          .then((data) => {
            return data.json();
          })
          .then((post) => {
            setData(post);
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

  console.log(data);

  return (
    <div>
      <div>
        <NavBar />
      </div>

      <div className="prose ps-32 pt-32 pb-8">
        <h1 className="text-white mb-0">Locations</h1>
        <text className="text-white">
          Check out UCLA’s amazing food trucks!
        </text>
      </div>
      {"\n\n\n"}
      <div className="prose ml-16 mr-16 max-w-full px-4 grid gap-24 grid-cols-2">
          {data.map((truck, index) => {
            return (
              <div className="">
                <div className="text-white">
                  <h3 className="text-white mt-2 font-base">{truck.name}</h3>
                  {"  "}
                  {truck.ratingAvg == 0 ? <text>-</text> : <text>{truck.ratingAvg}</text>}
                  <div className="rating rating-xs">
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star bg-white"
                      checked
                    />
                  </div>
                  {" | "}
                  {truck.waitTimeAvg == 0 ? <text>- min</text> : <text>{truck.waitTimeAvg} min</text>}
                </div>
                <div className="bg-medium-grey text-white my-4 px-2 py-2">
                  <text>{truck.blurb}</text>
                </div>
                <button
                  className="btn btn-active btn-link underline decoration-dark-yellow text-white"
                  onClick={() => handleClick(truck.name)}
                >
                  EXPLORE→
                </button>
              </div>
            );
          })}
        </div>
      </div>
  );
}
