import "../../dist/output.css";
import React, { useEffect, useState } from 'react';
import { DateTime } from "luxon";
import TextareaAutosize from "react-textarea-autosize";

function Review({ name, review, date, likes, rating }) {
  let items = [];
  let i = 0;
  for (; i < rating; i++) {
    items.push(
      <input
        type="radio"
        name="rating-1"
        className="mask mask-star bg-white"
        disabled
      />
    );
  }

  for (; i < 5; i++) {
    items.push(
      <input type="radio" name="rating-1" className="mask mask-star" disabled />
    );
  }
  return (
    <>
      <div className="w-[31.5rem] rounded-sm prose bg-gray px-8 py-6">
        {/*name*/}
        <h3 className="text-light-yellow font-normal block my-0">{name}</h3>
        <div className="rating rating-xs block">{items}</div>
        {/*review*/}
        <div>
          <TextareaAutosize
            className="flex w-[27.5rem] text-white text-sm bg-transparent py-2"
            name="scrollHeight"
            disabled
          >
            {review}
          </TextareaAutosize>
        </div>
        <br />
        {/*DATE*/}
        <text className="text-white text-xs">{date}</text>
        {" | "}
        {/*LIKES*/}
        <text className="text-white text-xs">{likes} likes</text>
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
      {console.log("I stink", reviewList.reviews)}
      {reviewList.reviews && reviewList.reviews.length > 0 ? (
        reviewList.reviews.map((item, index) => (
          <div>
            <Review
              key={index}
              name={item.username}
              review={item.review}
              date={DateTime.fromISO(item.date).toLocaleString(
                DateTime.DATETIME_MED
              )}
              likes={item.likes}
              rating={item.rating}
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
      {console.log("I stink", reviewList.reviews)}
      {reviewList.reviews && reviewList.reviews.length > 0 ? (
        reviewList.reviews.map((item) => (
          <div key={item._id}>
            <Review
              name={item.username}
              review={item.review}
              date={DateTime.fromISO(item.date).toLocaleString(
                DateTime.DATETIME_MED
              )}
              likes={item.likes}
              rating={item.rating}
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

export default Reviews;
