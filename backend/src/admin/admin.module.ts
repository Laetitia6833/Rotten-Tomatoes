import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "src/auth/auth.module";
import { UserSchema } from "src/auth/schemas/user.schema";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";

@Module({
    imports: [
        // AuthModule,
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
    ],
    controllers: [AdminController],
    providers: [AdminService],
    exports: [AdminService]
})

export class AdminModule { }
