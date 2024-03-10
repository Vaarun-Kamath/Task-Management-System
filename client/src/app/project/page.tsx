"use client";
import axios from "axios";
import React, { useState } from "react";

function Project() {

  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    deadline: null,
    createdOn: null,
    createdBy: "JEFF",
    collaborators: [],
    tasks: [],
    backlog: "backlog",
    timeline: "timeline",
    statistics: "statistics"
  });


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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;

    setFormData((prevData) => {
      if (checked) {
        return {
          ...prevData,
          [name]: [...prevData[name], value],
        };
      } else {
        return {
          ...prevData,
          [name]: prevData[name].filter((item) => item !== value),
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform actions with the form data here, such as sending it to the server
    console.log('Form data submitted:', formData);
    axios
      .post("http://localhost:8080/api/addProject", formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log("SUCCESS");
        console.log(response.data);
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
              <div key={project.name}>
                <h3>{`Project Name: ${project.name}`}</h3>
                <p>{`Description: ${project.description}`}</p>
                <p>{`Deadline: ${project.deadline}`}</p>
                
                <div>
                  <h4>Collaborators:</h4>
                  <ul>
                    {project.collaborators.map((collaborator, index) => (
                      <li key={index}>{collaborator}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4>Tasks:</h4>
                  <ul>
                    {project.tasks.map((task, index) => (
                      <li key={index}>{task}</li>
                    ))}
                  </ul>
                </div>

                <p>{`Backlog: ${project.backlog}`}</p>
                <p>{`Timeline: ${project.timeline}`}</p>
                <p>{`Statistics: ${project.statistics}`}</p>

                <hr />
              </div>
            ))}
            </ul>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Project Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Deadline:
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Created On:
          <input
            type="date"
            name="createdOn"
            value={formData.createdOn}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Collaborators:
          <input
            type="checkbox"
            name="collaborators"
            value="VarunC"
            onChange={handleCheckboxChange}
          /> Varun C
          <input
            type="checkbox"
            name="collaborators"
            value="VarunK"
            onChange={handleCheckboxChange}
          /> Varun K
          <input
            type="checkbox"
            name="collaborators"
            value="Vikas"
            onChange={handleCheckboxChange}
          /> Vikas
          <input
            type="checkbox"
            name="collaborators"
            value="Vishal"
            onChange={handleCheckboxChange}
          /> Vishal
        </label>
        <br />

        <label>
          Task:
          <input
            type="checkbox"
            name="tasks"
            value="Task 1"
            onChange={handleCheckboxChange}
          /> Task 1
          <input
            type="checkbox"
            name="tasks"
            value="Task 2"
            onChange={handleCheckboxChange}
          /> Task 2
        </label>
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Project;
