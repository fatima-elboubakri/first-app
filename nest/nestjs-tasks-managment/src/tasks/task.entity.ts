import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task.model';
import { User } from '../auth/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column()
  name!: string;
  @Column()
  description!: string;
  @Column()
  status!: TaskStatus;
  @ManyToOne((_user) => User, (user) => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true })
  user!: User;
}
