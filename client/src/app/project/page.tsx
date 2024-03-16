"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { GetProjects } from "../api/project/handler";
import { Project } from "@/types/project";
import PageHeader from "@/components/atoms/PageHeader";
import Card from "@/components/atoms/Card";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import ProjectForm from "@/components/forms/ProjectForm";

function Projects() {

    const [projects, setProjects] = useState<Project[] | null>(null);

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect(`/`);
        },
    });
    const user = session?.user;
    useLayoutEffect(() => {
        const fetchData = async () => {
            try {
                console.log("SESS", session);
                const user_id = user?.user_id;
                // console.log("TYPEOF USER ID", typeof user_id);
                const response = await GetProjects(user_id);
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [session]);

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
            <ProjectForm></ProjectForm>
        </section>
    );
}

export default Projects;