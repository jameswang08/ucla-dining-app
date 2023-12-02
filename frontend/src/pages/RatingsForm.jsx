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
                    <input className="bg-light-grey" name="waitTime" /> min
                </label>
                <br />
                <label class="text-white">
                    Rating: 
                    <div className="rating rating-xs">
                        <input type="radio" name="rating-1" className="mask mask-star-2" />
                        <input type="radio" name="rating-1" className="mask mask-star-2" />
                        <input type="radio" name="rating-1" className="mask mask-star-2" />
                        <input type="radio" name="rating-1" className="mask mask-star-2" />
                        <input type="radio" name="rating-1" className="mask mask-star-2" />
                    </div>
                </label >
                <br/>
                <p class="text-white">
                    Relevant meal time:{" "}
                    <label><input type="radio" name="myRadio" value="lunch" /> Lunch</label>{" "}
                    <label><input type="radio" name="myRadio" value="dinner" /> Dinner</label>
                </p>
                <label class="text-white">
                    Review:
                    <br/>
                    <div class="grid justify-items-center">
                        <textarea
                            class="bg-light-grey"
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