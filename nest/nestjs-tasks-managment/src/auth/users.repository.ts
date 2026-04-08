import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersRepository extends Repository<User> {
  async createUser(userDto: UserDto): Promise<User> {
    const user = this.create(userDto);
    await this.save(user);
    return user;
  }
}
