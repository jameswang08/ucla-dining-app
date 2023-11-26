import React from "react";
import NavBar from "../components/NavBar.jsx";
import "../../dist/output.css";
import "../components/grid.css";

export default function DashboardPage({name}) {
  return (
    <div>
      <div>
        <NavBar />
      </div>

      <div className="prose text-white ps-32 pt-32 pb-16">
        <h1 className="text-white mb-3"> {name}'s Dashboard</h1>
        <text>Take a look at your activity</text>
      </div>

      <div className='column ps-48 text-white text-lg'>
        <pre>Favorite Location</pre>

        <pre>Reputation</pre>

      </div>

      <div className='column text-white text-lg'>
      <pre>Your reviews</pre>
      <pre className='text-sm'>Sort by:</pre>

      </div>
    </div>
  );
}
