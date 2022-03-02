import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/auth/interfaces/user.interface";
import * as bcrypt from 'bcrypt'

@Injectable()
export class AdminService {
    constructor(@InjectModel('User') private userModel: Model<User>) { }

    async addUser(user) {
        const hashedPassword = await bcrypt.hash(user.password, 8)
        user.password = hashedPassword

        const newUser = new this.userModel(user)

        try {
            await newUser.save()
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('Email already exist')
            }
            console.log(error);
        }

    }
}
