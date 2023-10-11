import React, { useState, useMemo } from "react";

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
        let indent = 0;
        for (let i = 0, len = line.length; i < len; i++) {
          if (line[i] === "\t") {
            indent++;
          } else {
            break;
          }
        }

        line = line.trim();
        let [key, value] = [
          line.slice(0, line.indexOf(" ")),
          line.slice(line.indexOf(" ") + 1),
        ];
        key = key.toLowerCase();
        if (value.startsWith('"')) {
          value = value.slice(1, -1);
        }

        if (indent === 1 && key === "track") {
          if (
            Object.keys(track).length > 0 &&
            tracks.find(
              (alreadyPlayed) =>
                track.performer == alreadyPlayed.performer &&
                track.title == alreadyPlayed.title
            ) == null
          ) {
            tracks.push(track);
          }
          track = {};
        } else if (indent > 1) {
          track[key] = value;
        }
      }
      if (
        Object.keys(track).length > 0 &&
        tracks.find(
          (alreadyPlayed) =>
            track.performer == alreadyPlayed.performer &&
            track.title == alreadyPlayed.title
        ) == null
      ) {
        tracks.push(track);
      }
      return tracks;
    }
    return [];
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
        {cue && (
          <textarea
            value={trackListing
              .map((track) =>
                track.performer != null
                  ? `${track.performer} — ${track.title}`
                  : `${track.title}`
              )
              .join("\n")}
          />
        )}
      </main>
    </>
  );
}
