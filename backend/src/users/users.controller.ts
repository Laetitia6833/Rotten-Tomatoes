import { Body, Controller, Get, Param, Patch, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { identity } from "rxjs";
import { UpdateUserDto, UserUpdateUserDto } from "src/auth/dto/auth-credentials.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('allUsers')
  async getAll() {
    return this.usersService.getAll();
  }

  @Post('deleteUser/:userId')
  async deleteUser(@Param('userId') userId) {
    return this.usersService.deleteUser(userId);
  }

  @Get('/:id')
  async getUser(@Param('id') id) {
    return this.usersService.getUser(id);
  }


  @UseGuards(JwtAuthGuard)
  @Post('addToFavourite/:id')
  async addToFavourite(@Param('id') userId, @Body() movieId) {
    return this.usersService.addToFavourites(userId, movieId)

  }
  @Patch('/:id')
  async updateUser(
    @Param('id') id,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Patch('removeFromFavourite/:id')
  async removeFromFavourite(@Param('id') userId, @Body() movieId) {
    return this.usersService.removeFromFavourite(userId, movieId)
  }

  @Patch('userUpdate/:id')
  async updateSelf(@Param('id') id, @Body(ValidationPipe) userUpdateUserDto: UserUpdateUserDto) {

    return this.usersService.updateSelf(id, userUpdateUserDto)

  }
}
