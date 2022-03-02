import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { AdminAddUserDto } from "src/auth/dto/auth-credentials.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { AdminService } from "./admin.service";

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Post('addUser')
    async addUser(@Body(ValidationPipe) adminAddUserDto: AdminAddUserDto) {
        return this.adminService.addUser(adminAddUserDto)

    }

}
