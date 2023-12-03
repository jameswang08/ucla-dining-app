import "../../dist/output.css";
import React, { useEffect, useState } from "react";

function Review({ name, review, date, likes }) {
  return (
    <>
      <div className="prose bg-medium-grey px-4 py-4">
        {/*name*/}
        <h3 className="text-light-yellow font-normal block my-0">{name}</h3>
        <div className="rating rating-xs disabled block">
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star-2 bg-white"
            disabled
          />
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star-2 bg-white"
            disabled
          />
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star-2 bg-white"
            checked
            disabled
          />
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star-2 bg-white"
            disabled
          />
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star-2 bg-white"
            disabled
          />
        </div>
        {/*review*/}
        <text className="prose text-white text-base">{review}</text>
        <br />
        {/*DATE*/}
        <text className="text-white text-xs">{date}</text>
        {" | "}
        {/*LIKES*/}
        <text className="text-white text-xs">{likes}</text>
      </div>
    </>
  );
}

function Reviews({ truck, sortMethod }) {
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/trucks/${truck}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sortMethod: sortMethod,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setReviewList(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [truck, sortMethod]);

  return (
    <>
      {console.log("I stink1", reviewList)}
      {console.log("I stink2", reviewList.reviews)}
      {/* {console.log("I stink3", reviewList.reviews[0].reviews)} */}
      {reviewList.reviews && reviewList.reviews.length > 0 ? (
        reviewList.reviews[0].reviews.map((item) => (
          <>
            <Review
              key={item._id}
              name={item.username}
              review={item.review}
              date={item.date}
              likes={item.rating}
            />
            <h1>Break</h1>
          </>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </>
  );
}

export default Reviews;
