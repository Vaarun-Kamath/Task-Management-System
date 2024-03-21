export interface Task {
    _id: string,
    title: string;
    description: string;
    dueDate: string;
    createdOn: string;
    createdBy: string;
    projectId: string;
    status: string;
    priority: string;
    assignees: string[];
}
