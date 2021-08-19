import { FilterTaskDto } from './dto/filter-task.dto';
import { TasksRepository } from './tasks.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepositoy: TasksRepository,
  ) {}

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepositoy.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  // async getAllTasks() {
  //   const found = await this.tasksRepositoy.;
  // }
  getTasks(filterDto: FilterTaskDto): Promise<Task[]> {
    return this.tasksRepositoy.getTasks(filterDto);

  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepositoy.createTask(createTaskDto);
  }

  async deleteTaskById(id: string): Promise<any> {
    const result = await this.tasksRepositoy.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return {
      success: true,
    };
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);

    task.status = status;
    await this.tasksRepositoy.save(task);

    return task;
  }
}
