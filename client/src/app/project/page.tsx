"use client";

import { useEffect, useState } from "react";
import { GetProjects } from "../api/project/handler";
import { Project } from "@/types/project";
import PageHeader from "@/components/atoms/PageHeader";
import Card from "@/components/atoms/Card";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import ProjectForm from "@/components/forms/ProjectForm";
import { useRouter } from "next/navigation";

function Projects() {

    const [projects, setProjects] = useState<Project[] | null>(null);

    const router = useRouter();

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect(`/`);
        },
    });
    const user = session?.user;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const user_id = user?.user_id;
                const response = await GetProjects(user_id);
                console.log(response.data);
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
            <div className="flex flex-wrap gap-2">
                {projects && projects.map((project) => (
                    <div id={project._id} onClick={()=>{router.push(`/project/${project._id}`)}}>
                        <Card>
                            {project}
                        </Card>
                    </div>
                ))}
            </div>
            <ProjectForm></ProjectForm>
        </section>
    );
}

export default Projects;