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

  const [sort, setSort] = useState("");
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [review, setReview] = useState(0);

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

  console.log("Truck data", data.truck);

  const rerenderReview = () => {
    setReview(review + 1);
    console.log("Updating review");
  };

  return (
    <div>
      <div>
        <NavBar />
      </div>
      {console.log(data)}
      <div className="prose ps-32 pt-32 pb-8">
        <h1 className="text-white mb-0">{data.truck.name}</h1>
        {data.truck.ratingAvg == 0 ? (
          <text className="inline text-white">-</text>
        ) : (
          <text className="inline text-white">
            {parseInt(data.truck.ratingAvg * 100) / 100}
          </text>
        )}{" "}
        <div className="rating rating-xs inline">
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star bg-white"
            checked
          />
        </div>
        <text className="inline text-white"> | </text>
        {data.truck.waitTimeAvg == 0 ? (
          <text className="inline text-white">- min</text>
        ) : (
          <text className="inline text-white">
            {parseInt(data.truck.waitTimeAvg * 100) / 100} min
          </text>
        )}
      </div>

      <div className="absolute pt-[10rem]">
        <img
          src={"../../images/" + data.truck.name + ".png"}
          className="foodtruckimgs"
        ></img>
      </div>

      <div className="ps-[36rem]">
        <div className="max-w-full prose bg-light-yellow mt-4 ">
          <h2 className="text-black pl-20 pt-20 pr-120">Overview</h2>
          <p className="text-black pl-20 pr-20 pb-16">{data.truck.blurb}</p>
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
            <RatingsForm
              truckname={data.truck.name}
              key={data.truck.name}
              setReview={rerenderReview}
              value={review}
            />
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
          <div>
            <h2 className="text-white mb-0  pt-8">Reviews</h2>
            <text className="inline-block text-white">Sort by:</text>
            <ul
              className="text-dark-yellow btn btn-active btn-link"
              onClick={() => {
                setSort("latest");
              }}
            >
              Latest
            </ul>
            <ul
              className="text-dark-yellow btn btn-active btn-link"
              onClick={() => {
                setSort("earliest");
              }}
            >
              Earliest
            </ul>
            <ul
              className="text-dark-yellow btn btn-active btn-link"
              onClick={() => {
                setSort("popularity");
              }}
            >
              Popularity
            </ul>
          </div>

          <div className="absolute my-[-3rem]">
            <text className="inline-block text-white">
              Filter by:
              <ul className="text-dark-yellow btn btn-active btn-link"
                onClick={() => {
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
              >
                Lunch
              </ul>
              <ul className="text-dark-yellow btn btn-active btn-link"
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
              >
                Dinner
              </ul>
              <ul className="text-dark-yellow btn btn-active btn-link"
                onClick={() => {
                  const tempArr = [...appliedFilters];
                  const index = tempArr.indexOf("late_night");
                  if (index === -1) {
                    // Element is not in the array, so add it
                    tempArr.push("late_night");
                  } else {
                    // Element is in the array, so remove it
                    tempArr.splice(index, 1);
                  }
                  setAppliedFilters(tempArr);
                }}
              >
                Late Night
              </ul>
            </text>
          </div>

          <br />
          {/* Reviews go here */}
          <Reviews
            truck={truckname}
            sortMethod={sort}
            filters={appliedFilters}
            rerender={review}
          ></Reviews>
        </div>
      </div>
    </div>
  );
}
