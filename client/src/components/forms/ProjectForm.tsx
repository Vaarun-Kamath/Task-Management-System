"use client";

import Image from "next/image";
import { redirect } from "next/navigation";
import { useState } from "react";
import StyledInput from "../atoms/StyledInput";
import { FaExclamationCircle } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { AddProject } from "@/app/api/project/handler";

type Props = {
  callbackUrl?: string;
};

export default function ProjectForm(props: Props) {
    const [projectError, setProjectError] = useState<null | string>(null);
    const [loading, setLoading] = useState(false);

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect(`/`);
        },
    });

    const errorHandler = (error: string): void => {
        setProjectError(error);

        setTimeout(() => {
            setProjectError(null);
        }, 10000);
    };

    const validateInputs = (
        name: FormDataEntryValue,
        deadline: FormDataEntryValue
    ): boolean => {
        if (name === "") {
            setLoading(false);
            errorHandler("Project name is required");
            return false;
        }
        if (deadline != null) {
            const currDate = new Date();
            const deadlineDate = new Date(deadline.toString());
            if (deadlineDate < currDate) {
                setLoading(false);
                errorHandler("Deadline cannot be before today.");
                return false;
            }
        }
        setProjectError(null);
        return true;
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData(event.currentTarget);

        const name = formData.get("name") || "";
        const description = formData.get("description") || "";
        const deadline = formData.get("deadline") || "";

        try {
            if (!validateInputs(name, deadline)) return;
            const addedProject = await AddProject(name.toString(), description.toString(), deadline.toString(), session?.user.user_id);
            console.log("New Project Created", addedProject);
            window.location.reload();
        } catch (err) {
            errorHandler("Error creating project.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-center w-3/6 border-2 p-10">
            <h1 className="mt-2 mb-6 text-4xl font-bold text-center">Create New Project</h1>
            <form onSubmit={handleSubmit} className="w-full">
                <StyledInput
                    className="w-full p-2 my-3 border-gray-400 border"
                    name="name"
                    type="text"
                    placeholder="Project Name"
                />
                <StyledInput
                    className="w-full p-2 my-3 border-gray-400 border"
                    name="description"
                    type="text"
                    placeholder="Project Description"
                />
                <StyledInput
                    className="w-full p-2 my-3 border-gray-400 border"
                    name="deadline"
                    type="date"
                />

                {projectError && (
                    <span className="transition-all duration-200 bg-red-500 w-full text-sm rounded-sm text-white font-medium flex items-center px-1.5 py-1">
                    <FaExclamationCircle className="mr-2 animate-pulse" /> {projectError}
                    </span>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full font-medium flex items-center justify-center transition-all duration-200 text-white text-lg rounded-sm bg-slate-900 hover:bg-slate-800 py-2.5 mt-7 mb-6"
                >
                Create
                {loading && (
                    <Image
                        src="images/bars.svg"
                        alt="Loading"
                        className="ml-2 text-white select-none"
                        width={15}
                        height={15}
                    />
                )}
                </button>
            </form>
        </div>
    );
}
