import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from 'generated/prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateUserDto): Promise<User> {
    const user = await this.prismaService.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        passwordHash: dto.passwordHash,
        birthDate: dto.birthdate,
      },
    });

    return user;
  }

  async findById(id: string): Promise<User | null> {
    return await this.prismaService.user.findFirst({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prismaService.user.findFirst({
      where: { email },
    });
  }

  async findAll(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const { username, email, birthdate } = updateUserDto;

    const data: Prisma.UserUpdateInput = {};

    if (username) data.username = username;
    if (email) data.email = email;
    if (birthdate) data.birthDate = new Date(birthdate);

    const user = await this.prismaService.user.update({
      data,
      where: { id },
    });

    return user;
  }

  async remove(id: string) {
    await this.prismaService.user.delete({ where: { id } });
  }

  async setCurrentRefreshToken(userId: string, token: string) {
    await this.prismaService.user.update({
      where: { id: userId },
      data: { currentHashedRefreshToken: token },
    });
  }
}
