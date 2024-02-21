import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './task.dto';

@Injectable()
export class TaskService {
    taskList = [];

    findAll() {
        return {
            data: this.taskList,
            message: 'Task list get successfully',
            status: 200
        };
    }

    findOne(id: string) {
        const task = this.taskList.find((task) => task.id === id);
        if (task) {
            return {
                data: task,
                message: 'Task get successfully',
                status: 200
            }
        }
        return {
            message: 'Task not found',
            status: 200
        }
    }

    create(task: CreateTaskDto) {
        const taskObj = { id: `task${this.taskList.length + 1}`, ...task };
        this.taskList.push(taskObj);
        return {
            data: this.taskList,
            message: 'Task created successfully',
            status: 200
        }
    }

    update(task: CreateTaskDto) {
        const index = this.taskList.findIndex((item) => item.id === task.id);

        if (index !== -1) {
            this.taskList[index] = task;
            console.log(this.taskList);

            return {
                data: this.taskList,
                message: 'Task updated successfully',
                status: 200
            }
        }
        return {
            message: 'Task not found',
            status: 200
        }
    }

    delete(id: string) {
        const index = this.taskList.findIndex((item) => item.id === id);
        if (index !== -1) {
            this.taskList.splice(index, 1);
            return {
                data: this.taskList,
                message: 'Task deleted successfully',
                status: 200
            }
        }
        return {
            message: 'Task not found',
            status: 200
        }
    }

    updateStatus(id: string, newTask: Partial<CreateTaskDto>) {
        const task = this.taskList.find((item) => item.id === id);
        if (task) {
            task.status = newTask.status;
            return {
                data: task,
                message: 'Task status updated successfully',
                status: 200
            }
        }
        return {
            message: 'Task not found',
            status: 200
        }
    }

}
