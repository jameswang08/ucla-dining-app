import React, { useState } from "react";
import "../../dist/output.css";
import "../components/ratings.css";

export default function Rating() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-medium-grey my-4 px-4 py-4">
        <label className="text-white">
          Most recent wait time:{" "}
          <input
            className="rounded-sm px-7 py-0.5 w-20 bg-light-grey"
            name="waitTime"
            value={inputs.waitTime || ""}
            onChange={handleChange}
          />{" "}
          min
        </label>
        <br />
        <label className="text-white">
          Rating:{" "}
          <div
            className="rating rating-xs"
            onChange={handleChange}
            value={inputs.mealTime || ""}
          >
            <input
              type="radio"
              name="rating"
              className="mask mask-star-2 bg-white"
              value={1}
            />
            <input
              type="radio"
              name="rating"
              className="mask mask-star-2 bg-white"
              value={2}
            />
            <input
              type="radio"
              name="rating"
              className="mask mask-star-2 bg-white"
              value={3}
            />
            <input
              type="radio"
              name="rating"
              className="mask mask-star-2 bg-white"
              value={4}
            />
            <input
              type="radio"
              name="rating"
              className="mask mask-star-2 bg-white"
              value={5}
            />
          </div>
        </label>
        <br />
        <p className="text-white">
          Relevant meal time:{" "}
          <div
            className="inline-block"
            onChange={handleChange}
            value={inputs.mealTime || ""}
          >
            <input type="radio" name="mealTime" value="lunch" /> Lunch{" "}
            <input type="radio" name="mealTime" value="dinner" /> Dinner{" "}
            <input type="radio" name="mealTime" value="latenight" /> Late Night
          </div>
        </p>

        <label className="text-white">
          Review:
          <br />
          <div className="grid justify-items-center">
            <textarea
              className="rounded-sm bg-light-grey py-2 px-4"
              name="review"
              rows={8}
              cols={48}
              value={inputs.review || ""}
              onChange={handleChange}
            ></textarea>
          </div>
        </label>
      </div>
      <div className="text-white ">
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-active btn-link underline text-white text-lg decoration-light-yellow ml-[-1rem]"
        >
          POST
        </button>
      </div>
    </form>
  );
}
