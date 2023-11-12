import React from "react";
import NavBar from "./NavBar.jsx";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";

export default function HomePage() {
  return (
    <>
      <AppBar>
        <NavBar />{" "}
      </AppBar>
      <Box sx={{ bgcolor: "white", height: "100vh" }}></Box>
    </>
  );
}
