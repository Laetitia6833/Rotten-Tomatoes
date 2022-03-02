import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/interfaces/user.interface';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private userModel: Model<User>) { }

    async getAll() {
        return this.userModel.find();
    }

    async deleteUser(userId) {
        const user = await this.userModel.findOneAndDelete({ _id: userId });
    }

    async getUser(id) {
        const user = await this.userModel.findOne({ _id: id });
        return user;
    }

    async updateUser(id, user) {
        const updateUser = await this.userModel.findByIdAndUpdate({ _id: id }, user)
    }

    async addToFavourites(userId, movieId) {
        const user = await this.userModel.findOne({ _id: userId })

        if (!user.favourites.includes(movieId.filmId)) {
            user.favourites.push(movieId.filmId)
        } else {
            throw 'Movie already in list'
        }
        user.save()
        return user
    }

    async removeFromFavourite(userId, movieId) {
        let user = await this.userModel.findOne({ _id: userId })

        let movieList = user.favourites

        if (movieList.includes(movieId.movieId)) {
            movieList = movieList.filter((value) => {
                return value != movieId.movieId
            })
        }
        user.favourites = movieList

        try {
            user.save()
        } catch (error) {
            console.log(error);

        }
        return user

    }

    async updateSelf(userId, dto) {
        let user = await this.userModel.findOne({ _id: userId })

        if (user.password != dto.password) {
            const newPassword = await bcrypt.hash(dto.password, 8)
            user.password = newPassword
        }

        if (user.name != dto.name) {
            user.name = dto.name
        }
        if (user.email !== dto.email) {
            user.email = dto.email
        }

        try {
            await user.save()
        } catch (err) {
            if (err.code === 11000) {
                throw new ConflictException('Email already used')
            }

        }
        return user

    }
}
