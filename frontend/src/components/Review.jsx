import "../../dist/output.css";
import React, { useEffect, useState, useContext } from "react";
import { Icon } from "react-icons-kit";
import { thumbsUp } from "react-icons-kit/feather/thumbsUp";
import TextareaAutosize from "react-textarea-autosize";
import { Context } from "../components/Context.jsx";

function Review({ id, name, review, date, likes, rating, meal }) {
  const { loggedIn, setLoggedIn, savedUser, setSavedUser } =
    useContext(Context);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        await fetch(
          "http://localhost:3000/likes/" + savedUser + "/reviewid/" + id
        )
          .then((data) => {
            return data.json();
          })
          .then((post) => {
            // console.log("Like rendering", post);
            if (post.success) {
              setLiked(true);
            }
            setLoading(false);
          });
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    if (loggedIn) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [loggedIn, savedUser, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleLikeClick = (event) => {
    event.preventDefault();
    if (!loggedIn) return;
    if (name == savedUser) return;
    fetch("http://localhost:3000/updatelike", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: savedUser,
        reviewId: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(data);
          console.log("like update success");
          if (data.liked != liked) {
            setLiked(data.liked);
            if (data.liked) setLikeCount(likeCount + 1);
            else setLikeCount(likeCount - 1);
          }
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

  const prettifyMeal = (meal) => {
    switch (meal) {
      case 'lunch':
        return 'Lunch';
      case 'dinner':
        return 'Dinner';
      case 'lateNight':
        return 'Late Night';
      default:
        return '';
    }
  };

  return (
    <>
      <div className="w-[31.5rem] rounded-sm prose bg-gray px-8 py-6">
        {/*name*/}
        <h3 className="text-light-yellow font-medium block my-0">{name}</h3>
        
        <p className="text-white text-xs pt-3 my-0">{prettifyMeal(meal)}</p>
        <div className="rating rating-xs block">{items}</div>
        <p>{"\n"}</p>
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
          value={liked}
          onClick={(event) => handleLikeClick(event)}
          className={
            "absolute text-" +
            (liked ? "white" : "gray") +
            " ml-[0.25rem] mt-[0rem]"
          }
        >
          <Icon icon={thumbsUp} />
        </button>
      </div>
    </>
  );
}

export default Review;
