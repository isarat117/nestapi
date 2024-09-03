// user.controller.ts
import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUserProfile(@Param('id') id: number) {
    return this.userService.getUserProfile(id);
  }

  @Put(':id')
  async updateUserProfile(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUserProfile(id, updateUserDto);
  }
}
