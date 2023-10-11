import React, { useState, useEffect } from "react";

// Import and apply CSS stylesheet
import "./styles/styles.css";

// The component that adds our Meta tags to the page
import Seo from "./components/seo.jsx";

// Home function that is reflected across the site
export default function Home() {
  let [file, setFile] = useState(null);
  let [isActive, setActive] = useState(false);
  return (
    <>
      <Seo />
      <main
        className={isActive ? "active" : ""}
        role="main"
        onDragEnter={(evt) => {
          setActive(true);
        }}
        onDragLeave={(evt) => {
          setActive(false);
        }}
        onDropCapture={(evt) => {
          console.log(evt);
          evt.preventDefault();
          return false;
        }}
      >
        {file == null && <>Drop a .cue file to generate a track list.</>}
      </main>
    </>
  );
}
