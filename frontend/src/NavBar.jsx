import React from "react";

export default function NavBar() {
    return (
    <>
        <div className="navbar bg-dark-yellow">
            <div className="flex-1">
                <a className="btn glass normal-case text-xl">BruinEats</a>
            </div>

            <div className="dropdown dropdown-hover">
                    <label tabIndex={0} className="btn glass"> At a Glance </label>
                    <ul tabIndex={0} className="text-black dropdown-content z-[1] menu shadow p-2 rounded-box w-48">
                        <li><a>Truck 1</a></li>
                        <li><a>Truck 2</a></li>
                    </ul>
            </div>
            
            <div>
                <ul className="btn btn-active btn-link">Login</ul>
            </div>
        </div>
    </>
    );
};
import React from "react";

export default function NavBar() {
    return (
    <>
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn glass bg-base-100 normal-case text-xl">BruinEats</a>
            </div>

            <div className="dropdown dropdown-hover">
                    <label tabIndex={0} className="btn glass"> At a Glance </label>
                    <ul tabIndex={0} className="text-black dropdown-content z-[1] menu shadow p-2 bg-base-100 rounded-box w-48">
                        <li><a>Truck 1</a></li>
                        <li><a>Truck 2</a></li>
                    </ul>
            </div>
            
            <div>
                <ul className="btn btn-active btn-link">Login</ul>
            </div>
        </div>
    </>
    );
};