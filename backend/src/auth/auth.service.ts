import { BadRequestException, ConflictException, Injectable, NotAcceptableException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./interfaces/user.interface";
import * as bcrypt from 'bcrypt'
import { JwtService } from "@nestjs/jwt";
// import { httpService } from "@nestjs/axios";
import { HttpService } from '@nestjs/axios'

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User') private userModel: Model<User>,
        private jwtService: JwtService,
        private httpService: HttpService
    ) { }

    async register(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const name = authCredentialsDto.name
        const email = authCredentialsDto.email
        const password = authCredentialsDto.password
        const password_confirmation = authCredentialsDto.password_confirmation

        // const sessionId = authCredentialsDto.sessionId

        if (password !== password_confirmation) {
            throw new NotAcceptableException("Password doesn't match")
        } else {
            const hashedPassword = await bcrypt.hash(password, 8)

            const requestToken = await this.getToken()

            const user = new this.userModel({ name, email, password: hashedPassword, admin: false, sessionId: requestToken })

            try {
                await user.save()
                return requestToken
            } catch (error) {
                if (error.code === 11000) {
                    throw new ConflictException('Account already exists with this email')
                }
                console.log(error);
            }
        }
    }


    async getToken() {
        // https://api.themoviedb.org/3/authentication/guest_session/new?api_key=?

        let req = await this.httpService.get(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=?)
            .toPromise()
        const requestToken = req.data.guest_session_id;
        return requestToken
    }

    async login(user: User) {

        if (!user.sessionId) {
            const token = await this.getToken()
            user.sessionId = token
            try {
                await user.save()
            } catch (error) {
                console.log(error);
            }


        }


        const payload = { id: user._id, admin: user.admin, }

        return {
            accessToken: this.jwtService.sign(payload),
            user
        }
    }

    async validateUser(email: string, pass: string) {
        const user = await this.userModel.findOne({ email })

        if (!user) {
            return null
        }

        const validPassword = await bcrypt.compare(pass, user.password)

        if (!validPassword) {
            return null
        }

        return user

    }
}
