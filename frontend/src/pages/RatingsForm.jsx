import React from "react";

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
        <div class="bg-medium-grey my-4 px-4 py-4">
            <label class="text-white">
                Most recent wait time: <input class="bg-light-grey" name="waitTime"/> min
            </label>
            <br />
            <label class="text-white">
                Ratings: 
                <div className="rating rating-xs">
                    <input type="radio" name="rating-1" className="mask mask-star-2" />
                    <input type="radio" name="rating-1" className="mask mask-star-2" />
                    <input type="radio" name="rating-1" className="mask mask-star-2" />
                    <input type="radio" name="rating-1" className="mask mask-star-2" />
                    <input type="radio" name="rating-1" className="mask mask-star-2" />
                </div>
                | 
                <div className="rating rating-xs">
                    <input type="radio" name="rating-2" className="mask mask-star-2" />
                    <input type="radio" name="rating-2" className="mask mask-star-2" />
                    <input type="radio" name="rating-2" className="mask mask-star-2" />
                    <input type="radio" name="rating-2" className="mask mask-star-2" />
                    <input type="radio" name="rating-2" className="mask mask-star-2" />
                </div>
                | 
                <div className="rating rating-xs">
                    <input type="radio" name="rating-3" className="mask mask-star-2" />
                    <input type="radio" name="rating-3" className="mask mask-star-2" />
                    <input type="radio" name="rating-3" className="mask mask-star-2" />
                    <input type="radio" name="rating-3" className="mask mask-star-2" />
                    <input type="radio" name="rating-3" className="mask mask-star-2" />
                </div>
            </label >
            <br/>
            <label class="text-white">
                Review (breakfast):
                <br/>
                <div class="grid justify-items-center">
                    <textarea
                        class="bg-light-grey"
                        name="review-b"
                        
                        rows={4}
                        cols={40}
                    />
                </div>

                <br/>
                Review (lunch):
                <br/>
                <div class="grid justify-items-center">
                    <textarea
                        class="bg-light-grey"
                        name="review-l"
                        
                        rows={4}
                        cols={40}
                    />
                </div>

                <br/>
                Review (dinner):
                <br/>
                <div class="grid justify-items-center">
                    <textarea
                        class="bg-light-grey"
                        name="review-d"
                        
                        rows={4}
                        cols={40}
                    />
                </div>

        </label>
        
        </div>
        <div class="text-white ">
            <button class="underline decoration-dark-yellow" type="submit">POST</button>
        </div>
        
    </form>
    
    );
};