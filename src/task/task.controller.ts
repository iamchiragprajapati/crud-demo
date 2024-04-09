import { Body, Controller, Delete, Get, Param, ParseEnumPipe, Post, Put } from '@nestjs/common';
import { CreateTaskDto, TaskStatus } from './dto/task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor(
        private taskService: TaskService
    ) { }

    @Get()
    async findAll() {
        return this.taskService.findAll();
    }

    @Get(':id')
    async find(@Param('id') taskId: string) {
        return this.taskService.findOne(taskId);
    }

    @Post()
    async create(@Body() createTaskDto: CreateTaskDto) {
        return this.taskService.create(createTaskDto);
    }

    @Put(':id')
    async update(@Param('id') taskId: string, @Body() updateTaskDto: CreateTaskDto) {
        return this.taskService.update(taskId, updateTaskDto);
    }

    @Delete(':id')
    async delete(@Param('id') taskId: string) {
        return this.taskService.delete(taskId);
    }

    @Put('status/:id')
    async updateStatus(@Param('id') taskId: string, @Body('status', new ParseEnumPipe(TaskStatus)) status: TaskStatus) {
        return this.taskService.updateStatus(taskId, status);
    }
}
