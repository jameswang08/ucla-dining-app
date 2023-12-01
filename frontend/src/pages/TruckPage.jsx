import React from "react";
import NavBar from "../components/NavBar.jsx";
import "../../dist/output.css";
import RatingsForm from "./RatingsForm.jsx";

export default function TruckPage() {
    return (
      <div>
        <div>
          <NavBar />
        </div>

        <div className="prose text-white ps-32 pt-32 pb-16">
          <h1 className="text-white mb-0">Truck Name</h1>
          <text className="text-white">Avg Rating</text>
        </div>

        <div className="ps-[20rem]">
          <div className="max-w-full prose bg-light-yellow mt-4 ">
            <h2 className="text-black pl-20 pt-20 pr-120">Overview</h2>
            <p className="text-black pl-20 pr-20 pb-16">
              This is a placeholder because I cannot write, but hopefully this
              is enough to get an idea of how much text goes here, and how it
              will be formatted. Too much empty space to the right?
            </p>
          </div>
        </div>

        <div className="flex">
          <div className="prose w-1/2 px-20 py-16">
            <h2 className="text-white mb-0">Write a review!</h2>
            <text className="text-white w-3/4">Join the conversation:</text>
            <RatingsForm />
          </div>

          <div className="prose w-1/2 px-20 py-16">
            <h2 className="text-white mb-0">Reviews</h2>
            <text className="text-white w-3/4">Sort by:</text>
            <button tabIndex={0} className="btn btn-active btn-link">
              Latest
            </button>
            <button tabIndex={0} className="btn btn-active btn-link">
              Popular
            </button>
          </div>
        </div>
      </div>
    );
}