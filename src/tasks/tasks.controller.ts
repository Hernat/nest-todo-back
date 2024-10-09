import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Prisma } from '@prisma/client';
import { TasksService } from './tasks.service';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: Prisma.TaskCreateInput) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll(@Query() params: { where?: Prisma.TaskWhereInput }) {
    return this.tasksService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: Prisma.TaskWhereUniqueInput) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: Prisma.TaskUpdateInput,
  ) {
    return this.tasksService.update({
      where: { id: Number(id) },
      data: updateTaskDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: Prisma.TaskWhereUniqueInput) {
    return this.tasksService.remove(id);
  }
}
