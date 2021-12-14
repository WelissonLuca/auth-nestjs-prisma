import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get('/:id')
  async findById(@Param('id') id: number): Promise<User> {
    return this.userService.findById(id);
  }

  @Get('/email/:email')
  async findByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.findByEmail(email);
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<User>,
  ): Promise<User> {
    return this.userService.update(id, data);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.userService.delete(id);
  }
}
