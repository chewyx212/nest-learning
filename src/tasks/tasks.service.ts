import { User } from 'src/auth/user.entity';
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

  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.tasksRepositoy.findOne({ id, user });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  // async getAllTasks() {
  //   const found = await this.tasksRepositoy.;
  // }
  getTasks(filterDto: FilterTaskDto, user: User): Promise<Task[]> {
    return this.tasksRepositoy.getTasks(filterDto, user);
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepositoy.createTask(createTaskDto, user);
  }

  async deleteTaskById(id: string, user: User): Promise<any> {
    const result = await this.tasksRepositoy.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return {
      success: true,
    };
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);

    task.status = status;
    await this.tasksRepositoy.save(task);

    return task;
  }
}
