"use client";
import axios from "axios";
import React from "react";

function Project() {
  const handleClick = () => {
    console.log("SENDING");
    axios
      .get("http://localhost:8080/api/hello")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="bg-green-500 p-3 m-2 flex flex-row gap-5 justify-center font-bold">
      <button onClick={handleClick} className="bg-red-500 p-2 rounded-sm">
        Click meweybhegfbw wergyhwgbrw rgwibrebweg hb
      </button>
    </div>
  );
}

export default Project;
