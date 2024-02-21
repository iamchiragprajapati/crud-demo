export class CreateTaskDto {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
}

export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';