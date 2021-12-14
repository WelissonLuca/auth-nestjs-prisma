import { Injectable } from '@nestjs/common';

// Prisma
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

// Models
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

// Errors
//import { ForbiddenError } from '../../errors/forbidden.error';

// Bcrypt
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(createUserDto: CreateUserDto): Promise<User> {
    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createdUser = await this.prisma.user.create({ data });

    return {
      ...createdUser,
      password: undefined,
    };
  }

  findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: number, data: Partial<User>) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data,
    });

    return {
      ...updatedUser,
      password: undefined,
    };
  }

  async delete(id: number): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }

    await this.prisma.user.delete({ where: { id } });
  }
}
