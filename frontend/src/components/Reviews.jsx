import "../../dist/output.css";
import React, { useEffect, useState, useContext } from 'react';
import { Icon } from "react-icons-kit";
import { thumbsUp } from "react-icons-kit/feather/thumbsUp";
import { DateTime } from "luxon";
import TextareaAutosize from "react-textarea-autosize";
import { Context } from "../components/Context.jsx";

function Review({ id, name, review, date, likes, rating, liked }) {
  const { loggedIn, setLoggedIn, savedUser, setSavedUser } =
    useContext(Context);
  const [likeState, setLikeState] = useState(liked);
  const [likeCount, setLikeCount] = useState(likes);
  console.log(liked);

  const handleLikeClick = (event) => {
    event.preventDefault();
    if (!loggedIn)
      return;
    if (name == savedUser)
      return;
    if (likeState == true) {
      setLikeCount(likeCount - 1);
      setLikeState(false);
    }
    else {
      setLikeCount(likeCount + 1);
      setLikeState(true);
    }
    fetch(`http://localhost:3000/users/${savedUser}/updatelike`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reviewId: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(data);
          console.log("like update success");
        } else {
          console.log("like update failure");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

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
        <text className="text-white text-xs">{likeCount} likes</text>
        {/*LIKE BUTTON*/}
        <button
          id="button"
          type="button"
          value={likeState}
          onClick={(event) => handleLikeClick(event)}
          className={"absolute text-" + (likeState ? "white" : "gray") + " ml-[0.25rem] mt-[0rem]"}
        >
          <Icon icon={thumbsUp} />
        </button>
        { console.log(likeState) }
      </div>
    </>
  );
}

function Reviews({ truck, sortMethod }) {
  const { loggedIn, setLoggedIn, savedUser, setSavedUser } =
    useContext(Context);
  const [reviewList, setReviewList] = useState([]);
  const [userLikes, setUserLikes] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${savedUser}/likes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setUserLikes(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    if (loggedIn)
      fetchData();
  }, [truck, sortMethod]);

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
              id={item._id}
              name={item.username}
              review={item.review}
              date={DateTime.fromISO(item.date).toLocaleString(
                DateTime.DATETIME_MED
              )}
              likes={item.likes}
              rating={item.rating}
              liked={loggedIn ? (userLikes.indexOf(item._id) != -1) : false}
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
