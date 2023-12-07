import "../../dist/output.css";
import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import Review from "../components/Review.jsx";

function UserReviews({ user, sortMethod, filters, rerender }) {
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${user}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sortMethod: sortMethod,
            filters: filters,
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
  }, [user, sortMethod, filters, rerender]);

  return (
    <>
      {reviewList.reviews && reviewList.reviews.length > 0 ? (
        reviewList.reviews.map((item) => (
          <div key={item._id}>
            <Review
              id={item._id}
              name={item.username}
              review={item.review}
              date={DateTime.fromISO(item.date).toLocaleString(
                DateTime.DATETIME_MED
              )}
              likes={item.likes}
              rating={item.rating}
              meal={item.meal}
            />
            <br />
          </div>
        ))
      ) : (
        <p className="text-white">No reviews available.</p>
      )}
    </>
  );
}

export default UserReviews;
