import React, { useContext } from "react";
import NavBar from "../components/NavBar.jsx";
import "../../dist/output.css";
import "../components/grid.css";
import { useLocation } from "react-router-dom";
import { Context } from "../components/Context.jsx";

export default function DashboardPage() {
  const user = useLocation().state;
  const firstname = user.name.first;
  const lastname = user.name.last;
  const favorite = user.favorite;
  const reputation = user.reputation;
  const reviews = user.reviews;
  const testReviews = ["hi", "bye"];

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

      <div className="column ps-48 text-white text-lg">
        <pre>Favorite Location: </pre>

        <br className="py-10" />
        {/* <pre>Take a look at your activity</pre> */}

        <pre className="px-10 py-1 rounded-sm w-[20rem] bg-gray text-white">
          {favorite}{" "}
        </pre>

        <br />

        <pre>Reputation: </pre>

        <br />

        <pre className="px-10 py-1 rounded-sm w-[20rem] bg-gray text-white">
          {reputation}{" "}
        </pre>
      </div>

      <div className="column text-white text-lg">
        <pre>Your reviews</pre>
        <pre className="inline-block text-sm">Sort by:</pre>
        <ul className="text-dark-yellow btn btn-active btn-link">Latest</ul>
        {/* <ul className="text-dark-yellow btn btn-active btn-link">Popular</ul> */}

        <pre className="leading-[2rem]">{"\n"}</pre>

        <div>
          <ul>
            <textarea
              className="rounded-sm text-sm bg-light-grey py-2 px-4"
              name="review"
              rows={6}
              cols={51}
              disabled
            >
              {testReviews[0]}
            </textarea>

            <pre className="leading-[2rem]">{"\n"}</pre>

            <textarea
              className="rounded-sm text-sm bg-light-grey py-2 px-4"
              name="review"
              rows={6}
              cols={51}
              disabled
            >
              {testReviews[1]}
            </textarea>
            <br />
          </ul>
        </div>

        <pre className="leading-[2rem]">{"\n\n\n"}</pre>
      </div>
    </div>
  );
}
