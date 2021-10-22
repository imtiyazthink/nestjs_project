import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './interface/user.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async findAll(): Promise<User[]> {
        let users = [];
        try {
            users = await this.userModel.find();
        } catch (err) {
            throw new HttpException('Please Try Again', HttpStatus.FORBIDDEN)
        }
        if (users.length === 0) {
            throw new HttpException('No Data Found', HttpStatus.FOUND)
        }
        return users;
    }

    async findOne(id: string): Promise<User> {
        let user;
        try {
            user = await this.userModel.findById({ _id: id });
        } catch (err) {
            throw new HttpException('User Not Found', HttpStatus.NOT_FOUND)
        }
        if (!user) {
            throw new HttpException('User Not Found', HttpStatus.NOT_FOUND)
        }
        return user;
    }

    async create(user: User): Promise<User> {
        const newUser = new this.userModel(user);
        return await newUser.save();
    }

    async delete(id: string): Promise<User> {
        let user;
        try {
            user = await this.userModel.findByIdAndRemove(id);
        } catch (err) {
            throw new HttpException('User Not Found', HttpStatus.NOT_FOUND)
        }
        if (!user) {
            throw new HttpException('User Not Found', HttpStatus.NOT_FOUND)
        }
        return user;
    }

    async update(id: string, user: User): Promise<User> {
        return await this.userModel.findByIdAndUpdate(id, user, { new: true });
    }
}
