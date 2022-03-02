import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserSchema } from "./schemas/user.schema";
import { JwtStrategy } from "./strategies/jwt-auth.strategy";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: 'rottentomatoes',
            signOptions: { expiresIn: 36000 }
        }),
        HttpModule,
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService]
})

export class AuthModule { }
