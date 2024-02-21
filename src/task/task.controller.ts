import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateTaskDto } from './task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor(
        private taskService: TaskService
    ) { }

    @Get()
    findAll() {
        return this.taskService.findAll();
    }

    @Get(':id')
    find(@Param('id') taskId: string) {
        return this.taskService.findOne(taskId);
    }

    @Post()
    create(@Body() createTaskDto: CreateTaskDto) {
        return this.taskService.create(createTaskDto);
    }

    @Put(':id')
    update(@Body() updateTaskDto: CreateTaskDto) {
        return this.taskService.update(updateTaskDto);
    }

    @Delete(':id')
    delete(@Param('id') taskId: string) {
        return this.taskService.delete(taskId);
    }

    @Put('status/:id')
    updateStatus(@Param('id') taskId: string, @Body() task: Partial<CreateTaskDto>) {
        return this.taskService.updateStatus(taskId, task);
    }
}
