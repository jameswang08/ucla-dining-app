import React, { useContext, useState, useEffect } from "react";
import NavBar from "../components/NavBar.jsx";
import "../../dist/output.css";
import RatingsForm from "./RatingsForm.jsx";
import "../components/Images.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../components/Context.jsx";
import Reviews from "../components/Reviews.jsx";

export default function TruckPage() {
  const { loggedIn, setLoggedIn, savedUser, setSavedUser } =
    useContext(Context);

  const truckname = useLocation().state;

  const [sort, setSort] = useState(null);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        await fetch("http://localhost:3000/trucks/" + truckname)
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
  }, [truckname]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div>
        <NavBar />
      </div>
      {console.log(data)}
      <div className="prose ps-32 pt-32 pb-8">
        <h1 className="text-white mb-0">{data.name}</h1>
        {data.ratingAvg == 0 ? <text className="inline text-white">-</text> : <text className="inline text-white">{data.ratingAvg}</text>}
        {" "}<div className="rating rating-xs inline">
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star bg-white"
            checked
          />
        </div>
        <text className="inline text-white"> | </text>
        {data.waitTimeAvg == 0 ? <text className="inline text-white">- min</text> : <text className="inline text-white">{data.waitTimeAvg} min</text>}
      </div>

      <div className="absolute pt-[10rem]">
        <img
          src={"../../images/" + data.name +".png"}
          className="foodtruckimgs"
        ></img>
      </div>

      <div className="ps-[36rem]">
        <div className="max-w-full prose bg-light-yellow mt-4 ">
          <h2 className="text-black pl-20 pt-20 pr-120">Overview</h2>
          <p className="text-black pl-20 pr-20 pb-16">
            This is a placeholder because I cannot write, but hopefully this is
            enough to get an idea of how much text goes here, and how it will be
            formatted. Too much empty space to the right?
          </p>
        </div>
      </div>

      <div className="leading-20rem">
        <pre>{"\n\n"}</pre>
      </div>

      <div className="flex">
        <div className="prose w-1/2 px-20 py-[13rem]">
          <h2 className="text-white mb-0">Write a review!</h2>
          <text className="text-white w-3/4">Join the conversation:</text>
          <br />

          {loggedIn ? (
            <RatingsForm />
          ) : (
            <div className="text-white">
              <ul className="ps-0 btn btn-active btn-link">
                <Link
                  className="text-white underline decoration-dark-yellow"
                  to="/login"
                >
                  Login
                </Link>
              </ul>
              to leave a review.
            </div>
          )}
        </div>

        <div className="prose w-1/2 px-36">
          <p>
            <h2 className="text-white mb-0  pt-8">Reviews</h2>
            <text className="inline-block text-white">Sort by:</text>
            <ul className="text-dark-yellow btn btn-active btn-link" onClick = {() => setSort("latest")}>Latest</ul>
            {/* <ul className="text-dark-yellow btn btn-active btn-link">
              Popular
            </ul> */}
          </p>

          <p className="absolute my-[-4rem]">
            <text className="inline-block text-white">
              Filter by:
              <ul className="text-dark-yellow btn btn-active btn-link">
                Lunch
              </ul>
              <ul className="text-dark-yellow btn btn-active btn-link">
                Dinner
              </ul>
              <ul className="text-dark-yellow btn btn-active btn-link">
                Late Night
              </ul>
            </text>
          </p>
          {/* Reviews go here */}
          <Reviews truck = {truckname} sortMethod = {sort}></Reviews>
        </div>
      </div>
    </div>
  );
}
