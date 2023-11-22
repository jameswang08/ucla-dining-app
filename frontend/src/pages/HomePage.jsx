import React from "react";
import NavBar from "../components/NavBar.jsx"
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import '../../dist/output.css'

export default function HomePage() {
    return (
        <div>
            <div>
                <NavBar />
            </div>

            <div class="text-white text-4xl ps-32 my-60 leading-[4rem]">
                <pre> Your one-stop shop for</pre>
                <pre> UCLA dining reviews.</pre>
            </div>

            <div class="text-black bg-light-yellow ps-40 py-7 my-40 leading-[2rem]">
                <pre class='text-2xl font-bold leading-[2rem]'>Our goals{'\n\n'}</pre>
                
                <pre class='leading-[2rem]'>We believe in simplifying food for Bruins. {'\n'} </pre>
                <pre class='leading-[1rem]'>How we do this? {'\n\n'} </pre>
                <pre class='leading-[2rem]'>By helping Bruins help Bruins navigate on-campus dining.{'\n'}
                    We offer a digital space for students to review UCLA’s dining {'\n'}
                    halls and takeout restaurants and benefit current and future {'\n'}
                    students alike.</pre>
            </div>

        
        {/* <Container maxWidth={false} disableGutters>
                
            </Container> */}
        </div>
    );
}
