"use client";
import axios from "axios";
import React, { useState } from "react";

function Project() {

  const [projects, setProjects] = useState([]);

  const handleClick = () => {
    console.log("SENDING");
    axios
      .get("http://localhost:8080/api/projects")
      .then((response) => {
        console.log(response.data);
        setProjects(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="bg-green-500 p-3 m-2 flex flex-row gap-5 justify-center font-bold">
        <button onClick={handleClick} className="bg-red-500 p-2 rounded-sm">
          Click to Fetch Projects
        </button>
      </div>
      <div>
        {projects.length > 0 && (
          <div>
            <h2>Projects:</h2>
            <ul>
              {projects.map((project) => (
                <li key={project.name}>
                  {`Name: ${project.name}, Description: ${project.desc}`}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Project;
