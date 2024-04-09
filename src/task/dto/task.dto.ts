export enum TaskStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

import { IsEnum, IsString } from "class-validator";

export class CreateTaskDto {
    id: string;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsEnum(TaskStatus)
    status: TaskStatus;
}
