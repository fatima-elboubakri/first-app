/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../task.model';

export class FiltersTaskDto {
  @IsOptional()
  search: string = '';
  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus = TaskStatus.OPEN;
}
