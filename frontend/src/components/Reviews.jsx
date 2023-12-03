import "../../dist/output.css";
import React from 'react';



function Review({name, review, date, likes}) {
    return(
        <>
            <div className="prose bg-medium-grey px-4 py-4">
            {/*name*/}
            <h3 className="text-light-yellow font-normal block my-0">{name}</h3>
            <div className="rating rating-xs disabled block">
                <input
                type="radio"
                name="rating-1"
                className="mask mask-star-2 bg-white" disabled
                />
                <input
                type="radio"
                name="rating-1"
                className="mask mask-star-2 bg-white" disabled
                />
                <input
                type="radio"
                name="rating-1"
                className="mask mask-star-2 bg-white" checked disabled
                />
                <input
                type="radio"
                name="rating-1"
                className="mask mask-star-2 bg-white" disabled
                />
                <input
                type="radio"
                name="rating-1"
                className="mask mask-star-2 bg-white" disabled
                />
            </div>
            {/*review*/}
            <text className="prose text-white text-base">
                {review}
            </text>
            <br/>
            {/*DATE*/}
            <text className="text-white text-xs">{date}</text>
            {" | "}
            {/*LIKES*/}
            <text className="text-white text-xs">{likes}</text>
            </div>
        </>
    )
}

function Reviews({truck, sortMethod}){
    const req = fetch(`http://localhost:3000/trucks/${truck}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sortMethod: sortMethod,
        }),
    });
    const reviewList = req.json();
    return(
        <>
            {reviewList.map((item) => {
                <Review name={item.name} review={item.review} date={item.date} likes={item.likes}></Review>
            })}
        </>
    )
}   

export default Reviews