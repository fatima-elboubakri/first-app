import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task.model';
import { FiltersTaskDto } from './dto/filters-task.dto';
import { User } from '../auth/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}
  /*  private tasks: Task[] = [];*/

  async getAllTasks(filtersDto: FiltersTaskDto, user: User): Promise<Task[]> {
    const { status, search } = filtersDto;
    const query = this.taskRepository.createQueryBuilder('task');
    query.where({ user });
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        '(LOWER(task.name) like :search OR LOWER(task.description) like :search)',
        { search: '%' + search + '%' },
      );
    }
    const task = await query.getMany();

    return task;
  }

  /*  getTaskById(id: string): Task | undefined {
    const found = this.tasks.find((task: Task) => task.id === id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  } */
  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }
  /*
  getFiltredTasks(filtersDto: FiltersTaskDto): Task[] {
    return this.tasks.filter((task: Task) => {
      const matchesKeyword =
        task.name.includes(filtersDto.keyword) ||
        task.description.includes(filtersDto.keyword);
      const matchesStatus =
        filtersDto.status === TaskStatus.ALL ||
        task.status === filtersDto.status;
      return matchesKeyword && matchesStatus;
    });
  }
*/
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { name, description } = createTaskDto;
    const task = this.taskRepository.create({
      name,
      description,
      status: TaskStatus.OPEN,
      user,
    });
    await this.taskRepository.save(task);
    return task;
    //  return this.taskRepository.createTaskFromDto(createTaskDto, user);
  }

  /*
  createTask(createTaskDto: CreateTaskDto): Task {
    const { name, description } = createTaskDto;
    const task = {
      id: randomUUID(),
      name,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
*/
  async updateTask(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);

    task.status = status;
    await this.taskRepository.update(task.id, task);

    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
}
