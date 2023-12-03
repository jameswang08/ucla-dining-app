import React, { useContext, useState, useEffect } from "react";
// import { useState } from "react";
import NavBar from "../components/NavBar.jsx";
import "../../dist/output.css";
import "../components/grid.css";
import { useLocation } from "react-router-dom";
import { Context } from "../components/Context.jsx";
import { Icon } from "react-icons-kit";
import { arrowSortedDown } from "react-icons-kit/typicons/arrowSortedDown";
import TextareaAutosize from "react-textarea-autosize";

export default function DashboardPage() {
  const user = useLocation().state;
  const firstname = user.name.first;
  const lastname = user.name.last;
  const reputation = user.reputation;
  const reviews = user.reviews;
  const testReviews = [
    "hijsojfpoejpqjwpojqpojfoqjfoqjfopqjopfjqpjfqpjfpoqjopfjqopfjadjoajodapjaojajoapjopqp \
  qjfiopqwjfpiqjwfpiqjpiaipajidfjdiapjfpajipfjapjfpajifpjipajfpiajpfjajifpjapijfjapijpiajpfjpsajfpaf \
  jiajdfaojfapojpjdpfjaijdfpajfipjaipjfipasjfpajdpfijafjdpajfiajfpiasjfpiajfiapjfpiajpfajpisfjpaijfpiajfipa \
  asjoipdfjapijfpiajfpiajfpiajpifjaipjfpiajipfjaipjfaipjapijap \
  apple aofjpwoejpfajopjefpoawjefopjawopfjpoawjopfjawpoefjpoawjefopawjpofajwpfojawpofjawopjfpaojopjspojposj",
    "bye",
  ];
  const [favorite, setFavorite] = useState(user.favorite);

  const [trucks, setTrucks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [textareaheight, setTextareaheight] = useState(1);

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
        <pre>Your reviews</pre>
        <pre className="inline-block text-sm">Sort by:</pre>
        <ul className="text-dark-yellow btn btn-active btn-link">Latest</ul>
        {/* <ul className="text-dark-yellow btn btn-active btn-link">Popular</ul> */}

        <pre className="leading-[2rem]">{"\n"}</pre>

        <div className="w-[31.5rem] prose bg-gray px-8 py-6">
          <h3 className="text-dark-yellow font-normal block my-0">Joe Bruin</h3>
          <div className="rating rating-xs disabled block">
            <input
              type="radio"
              name="rating-1"
              className="mask mask-star bg-white"
              disabled
            />
            <input
              type="radio"
              name="rating-1"
              className="mask mask-star bg-white"
              disabled
            />
            <input
              type="radio"
              name="rating-1"
              className="mask mask-star bg-white"
              checked
              disabled
            />
            <input
              type="radio"
              name="rating-1"
              className="mask mask-star bg-white"
              disabled
            />
            <input
              type="radio"
              name="rating-1"
              className="mask mask-star bg-white"
              disabled
            />
          </div>
          <p>{"\n"}</p>
          <TextareaAutosize
            className="flex w-[27.5rem] text-white rounded-sm text-sm bg-transparent py-2"
            name="scrollHeight"
            disabled
          >
            {testReviews[1]}
          </TextareaAutosize>
          <br />
          <text className="text-white text-xs">Oct 24, 2023</text>
          {" | "}
          <text className="text-white text-xs">5 likes</text>
        </div>

        <pre className="leading-[2rem]">{"\n\n\n"}</pre>
      </div>
    </div>
  );
}
