import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../interface/interface';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private users: User[] = [];
  getUsers() {
    return this.users;
  }
  getUserById(id: string): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  createUser(createUserDto: CreateUserDto) {
    const newUser: User = {
      id: uuidv4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...createUserDto,
    };
    this.users.push(newUser);
    const newUserNoPassword = Object.assign({}, newUser);
    delete newUserNoPassword.password;
    return newUserNoPassword;
  }
  updateUser(updateUserDto: UpdateUserDto, id: string) {
    const user = this.getUserById(id);
    const userIdx = this.getUserIdx(id);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException('Wrong password');
    }

    const newUserNoPassword = Object.assign({}, user);
    delete newUserNoPassword.password;
    const result = {
      ...newUserNoPassword,
      password: updateUserDto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };
    this.users[userIdx] = result;
    const resultNoPassword = Object.assign({}, result);
    delete resultNoPassword.password;
    return resultNoPassword;
  }

  getUserIdx(id: string): number {
    const userIdx = this.users.findIndex((user) => id === user.id);
    if (userIdx != -1) {
      return userIdx;
    }
    throw new NotFoundException('User not found');
  }

  deleteUser(id: string) {
    const user = this.getUserIdx(id);
    this.users.splice(user, 1);
  }
}
