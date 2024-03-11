"use client";

import { useEffect, useState } from "react";
import { GetProjects } from "../api/project/handler";
import { Project } from "@/types/project";
import PageHeader from "@/components/atoms/PageHeader";
import Card from "@/components/atoms/Card";

function Projects() {

    const [projects, setProjects] = useState<Project[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetProjects();
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <section className="p-5">
            <PageHeader title="Projects"></PageHeader>
            <div className="flex flex-wrap gap-4">
                {projects && projects.map((project) => (
                    <Card>
                        <h2>{project.name}</h2>
                        <p>Description: {project.description}</p>
                        <p>Deadline: {project.deadline}</p>
                        <p>Created On: {project.createdOn}</p>
                        <p>Backlog: {project.backlog}</p>
                        <p>Timeline: {project.timeline}</p>
                        <p>Created By: {project.createdBy}</p>

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

                        <p>Statistics: {project.statistics}</p>
                    </Card>
                ))}
            </div>
        </section>
    );
}

export default Projects;