export interface Task {
    id: string,
    title: string;
    description: string;
    dueDate: string;
    createdOn: string;
    createdBy: string;
    projectId: string;
    status: string;
    priority: number;
    assigneeId: string;
}
