import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task.model';
import { Injectable } from '@nestjs/common';
import { User } from '../auth/user.entity';
@Injectable()
export class TaskRepository extends Repository<Task> {
  async createTaskFromDto(
    createTaskDto: CreateTaskDto,
    user: User,
  ): Promise<Task> {
    const { name, description } = createTaskDto;
    const task = this.create({
      name,
      description,
      status: TaskStatus.OPEN,
      user,
    });
    await this.save(task);
    return task;
  }
}
