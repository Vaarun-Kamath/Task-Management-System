export interface Project {
    _id: string,
    name: string;
    description: string;
    deadline: string;
    createdOn: string;
    backlog: string;
    timeline: string;
    createdBy: string;
    collaborators: string[];
    tasks: string[];
    statistics: string;
}
