import { Injectable } from '@nestjs/common';
import { Prisma, Task } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskDto: Prisma.TaskCreateInput): Promise<Task> {
    const task = await this.prisma.task.create({
      data: createTaskDto,
    });

    return task;
  }

  async findAll(params: { where?: Prisma.TaskWhereInput }): Promise<Task[]> {
    const { where } = params;
    return this.prisma.task.findMany({
      where,
    });
  }

  async findOne(id: Prisma.TaskWhereUniqueInput): Promise<Task | null> {
    console.log('id', id);
    return await this.prisma.task.findUnique({ where: { id: Number(id) } });
  }

  async update(params: {
    where: Prisma.TaskWhereUniqueInput;
    data: Prisma.TaskUpdateInput;
  }): Promise<Task> {
    const { where, data } = params;
    return await this.prisma.task.update({
      where,
      data,
    });
  }

  async remove(id: Prisma.TaskWhereUniqueInput) {
    return await this.prisma.task.delete({ where: { id: Number(id) } });
  }
}
