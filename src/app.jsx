import React, { useState } from "react";

// Import and apply CSS stylesheet
import "./styles/styles.css";

// The component that adds our Meta tags to the page
import Seo from "./components/seo.jsx";

// Home function that is reflected across the site
export default function Home() {
  let [cue, setCue] = useState(null);
  let [isActive, setActive] = useState(false);
  
  let trackListing = useMemo(() => {
    if (cue) {
      let tracks = [];
      let lines = cue.split("\n");
      let track = {};
      for (let line of lines) {
        let indent = line.indexOf(/^\t/);
        if (indent === 1 && line.trim().startsWith("TRACK")) {
          if (Object.keys(track) > 0) {
            tracks.push(track)
          }
          track = {};
        } else if (indent > 1) {
          
        }
      }
      if (Object.keys(track) > 0) {
        tracks.push(track)
      }
    }
  }, [cue]);

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
        onDragOver={(evt) => {
          evt.preventDefault();
        }}
        onDrop={async (evt) => {
          evt.preventDefault();

          let file = evt.dataTransfer.items[0].getAsFile();
          let text = await file.text();
          setCue(text);
        }}
      >
        {cue == null && <>Drop a .cue file to generate a track list.</>}
        {cue && <textarea value={cue}/>}
      </main>
    </>
  );
}
