import React, { useContext, useState, useEffect } from "react";
import NavBar from "../components/NavBar.jsx";
import "../components/Images.css";
import "../components/headers.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../components/Context.jsx";

export default function LocationsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <div className="flex">
        <div className="prose w-1/2 ml-32 mr-4">
          <h2 className="text-light-yellow mb-2 font-medium">
            Normal Hours Food Trucks
          </h2>
          <div className="text-white">
            <h3 className="text-white mt-2 font-base">Baja California</h3>
            {"  "}
            <text>_._</text>
            <div className="rating rating-xs">
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-white"
                checked
              />
            </div>
            {" | "}
            <text>_ min</text>
          </div>
          <div className="bg-medium-grey text-white my-4 px-2 py-2">
            <text>[Blurb]</text>
          </div>
          <button className="btn btn-active btn-link underline decoration-dark-yellow text-white">
            EXPLORE
          </button>

          <br />

          <div className="text-white">
            <h3 className="text-white mt-2 font-base">Kalamaki</h3>
            {"  "}
            <text>_._</text>
            <div className="rating rating-xs">
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-white"
                checked
              />
            </div>
            {" | "}
            <text>_ min</text>
          </div>
          <div className="bg-medium-grey text-white my-4 px-2 py-2">
            <text>[Blurb]</text>
          </div>
          <button className="btn btn-active btn-link underline decoration-dark-yellow text-white">
            EXPLORE
          </button>
        </div>

        <div className="prose w-1/2 mr-32 ml-4">
          <h2 className="text-light-yellow mb-2 font-medium">
            Late Night Only Food Trucks
          </h2>
          <div className="text-white">
            <h3 className="text-white mt-2 font-base">
              BittieBitez Mini-Donuts
            </h3>
            {"  "}
            <text>_._</text>
            <div className="rating rating-xs">
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-white"
                checked
              />
            </div>
            {" | "}
            <text>_ min</text>
          </div>
          <div className="bg-medium-grey text-white my-4 px-2 py-2">
            <text>
              Donut truck in Southern California providing fresh made mini
              donuts food truck with a variety of toppings from chocolate, oreo,
              to Fruity Pebbles.
            </text>
          </div>
          <button className="btn btn-active btn-link underline decoration-dark-yellow text-white">
            EXPLORE
          </button>
        </div>
      </div>
    </div>
  );
}
