import React from "react";
import "../components/ratings.css";

export default function Rating() {
    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();
    
        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
    
        // You can pass formData as a fetch body directly:
        fetch('/some-api', { method: form.method, body: formData });
    
        // Or you can work with it as a plain object:
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
    }

    return (
      <form method="post" onSubmit={handleSubmit}>
        <div className="bg-medium-grey my-4 px-4 py-4">
          <label className="text-white">
            Most recent wait time:{" "}
            <input className="w-20 bg-light-grey" name="waitTime" /> min
          </label>
          <br />
          <label className="text-white">
            Rating:{" "}
            <div className="rating rating-xs">
              <input
                type="radio"
                name="rating-1"
                className="mask mask-star-2 bg-white"
              />
              <input
                type="radio"
                name="rating-1"
                className="mask mask-star-2 bg-white"
              />
              <input
                type="radio"
                name="rating-1"
                className="mask mask-star-2 bg-white"
              />
              <input
                type="radio"
                name="rating-1"
                className="mask mask-star-2 bg-white"
              />
              <input
                type="radio"
                name="rating-1"
                className="mask mask-star-2 bg-white"
              />
            </div>
          </label>
          <br />
          <p className="text-white">
            Relevant meal time:{" "}
            <label>
              <input type="radio" name="myRadio" value="lunch" /> Lunch
            </label>{" "}
            <label>
              <input type="radio" name="myRadio" value="dinner" /> Dinner
            </label>
          </p>
          <label className="text-white">
            Review:
            <br />
            <div className="grid justify-items-center">
              <textarea
                className="bg-light-grey"
                name="review"
                rows={4}
                cols={40}
              />
            </div>
          </label>
        </div>
        <div className="text-white ">
          <button className="underline decoration-dark-yellow" type="submit">
            POST
          </button>
        </div>
      </form>
    );
};