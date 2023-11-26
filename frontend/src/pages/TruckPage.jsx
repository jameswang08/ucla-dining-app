import React from "react";
import NavBar from "../components/NavBar.jsx";
import "../../dist/output.css";

export default function TruckPage() {
    return (
        <div>
            <div>
                <NavBar />
            </div>

            <div class="prose text-white ps-32 pt-32 pb-16">
                <h1 className="text-white mb-0">Truck Name</h1>
                <text className="text-white">Avg Rating</text>
            </div>
            <div class="w-screen grid justify-items-end">
                <div class="prose bg-light-yellow mt-4 w-screen">
                    <h2 class="text-black pl-20 pt-20 pb-0 pr-120">Overview</h2>
                    <p class="text-black pl-20 pr-20 pb-16">This is a placeholder because I cannot write, but hopefully this is enough to get an idea of how much text goes here, and how it will be formatted. Too much empty space to the right?
    </p>
                </div>
            </div>

        </div>
    );
}