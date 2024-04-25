import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseEnumPipe, Post, Put, Query, UsePipes } from '@nestjs/common';
import { CustomDatePipe } from 'src/pipes/custom-date/custom-date.pipe';
import { CreateTaskDto, TaskStatus } from './dto/task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor(
        private taskService: TaskService
    ) { }

    @Get()
    async findAll(
        @Query('page', new DefaultValuePipe(1)) page: number,
        @Query('limit', new DefaultValuePipe(10)) limit: number) {
        return this.taskService.findAll(page, limit);
    }

    @Get(':id')
    async find(@Body('id') taskId: string) {
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

    @Post('saveDate')
    @UsePipes(new CustomDatePipe())
    async saveDate(@Body('date') date: Date) {
        return this.taskService.saveDates(date);
    }
}
