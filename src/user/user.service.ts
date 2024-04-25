import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './models/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>
  ) { }

  async create(createUserDto: CreateUserDto) {
    const newUser = new this.UserModel(createUserDto);
    const createdUser = await newUser.save();
    return {
      data: createdUser,
      message: 'User created successfully',
      status: true
    }
  }

  async findAll() {
    const users = await this.UserModel.find();
    return {
      data: users,
      message: 'User list fetched successfully',
      status: true
    }
  }

  async findByAge(age: number) {
    const user = await this.UserModel.find({ age: age });
    if (user) {
      return {
        data: user,
        message: 'User get successfully',
        status: 200
      }
    } else {
      return {
        message: 'User not found',
        status: 200
      }
    }

  }
}
