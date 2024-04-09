import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto, TaskStatus } from './dto/task.dto';
import { Task, TaskDocument } from './models/task.schema';

@Injectable()
export class TaskService {
    constructor(
        @InjectModel(Task.name) private taskModel: Model<TaskDocument>
    ) { }

    async findAll() {
        try {
            const tasks = await this.taskModel.find({});
            return {
                data: tasks,
                error: [],
                message: 'Task list fetched successfully',
                status: true
            }
        } catch (err) {
            throw new HttpException({
                status: false,
                message: err.message,
                error: err.error,
            }, err.status)
        }
    }

    async findOne(taskId: string) {
        try {
            const task = await this.taskModel.findOne({ _id: taskId });
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
        } catch (err) {
            throw new HttpException({
                status: false,
                message: err.message,
                error: err.error,
            }, err.status)
        }
    }

    async create(task: CreateTaskDto) {
        try {
            const newTask = new this.taskModel(task);
            const createdTask = await newTask.save();
            return {
                data: createdTask,
                message: 'Task created successfully',
                status: true
            }
        } catch (err) {
            throw new HttpException({
                status: false,
                message: err.message,
                error: err.error,
            }, err.status)
        }
    }

    async update(taskId: string, taskDto: CreateTaskDto) {
        try {
            const task = await this.taskModel.findOne({ _id: taskId });
            if (!task) {
                return {
                    message: 'Task not found',
                    status: 200
                }
            }
            const updatedTask = await this.taskModel.findOneAndUpdate(
                { _id: taskId },
                taskDto,
                { new: true }
            );
            return {
                data: updatedTask,
                message: 'Task updated successfully',
                status: 200
            }
        } catch (err) {
            throw new HttpException({
                status: false,
                message: err.message,
                error: err.error,
            }, err.status)
        }
    }

    async delete(id: string) {
        try {
            const task = await this.taskModel.findOne({ _id: id });
            if (!task) {
                return {
                    message: 'Task not found',
                    status: 200
                }
            }
            await this.taskModel.findOneAndDelete({ _id: id }).exec();
            return {
                message: 'Task deleted Successfully',
                status: 200,
            }
        } catch (err) {
            throw new HttpException({
                status: false,
                message: err.message,
                error: err.error,
            }, err.status)
        }

    }

    async updateStatus(id: string, taskStatus: TaskStatus) {
        try {
            const task = await this.taskModel.findOne({ _id: id });
            if (!task) {
                return {
                    message: 'Task not found',
                    status: 200
                }
            }
            const updatedTask = await this.taskModel.findOneAndUpdate(
                { _id: id },
                { status: taskStatus },
                { new: true }
            );
            return {
                data: updatedTask,
                message: 'Task updated successfully',
                status: 200
            }
        } catch (err) {
            throw new HttpException({
                status: false,
                message: err.message,
                error: err.error,
            }, err.status)
        }
    }

}
