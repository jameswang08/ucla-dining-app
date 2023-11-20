import React from "react";
import NavBar from "./NavBar.jsx"
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import '../dist/output.css'

export default function HomePage() {
    return (
        <div>
            <div>
                <NavBar />
            </div>

            <div class="text-white text-3xl ms-40 my-60 leading-[4rem]">
                <pre> Your one-stop shop for</pre>
                <pre> UCLA dining reviews.</pre>
            </div>

            {/* <div>
                <button class="bg-sky-500/100">hi blah blah blah</button>
            </div> */}
        
        {/* <Container maxWidth={false} disableGutters>
                
            </Container> */}
        </div>
    );
}