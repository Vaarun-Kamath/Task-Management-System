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
                        {project}
                    </Card>
                ))}
            </div>
        </section>
    );
}

export default Projects;