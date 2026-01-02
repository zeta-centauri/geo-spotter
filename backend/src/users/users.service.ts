import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from 'generated/prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly configService: ConfigService
    ) {}

    getAbsoluteAvatarUrl(relativeUrl: string) {
        const protocol = this.configService.get<string>('API_PROTOCOL');
        const host = this.configService.get<string>('API_HOST');
        const port = this.configService.get<string>('API_PORT');

        return `${protocol}://${host}:${port}${relativeUrl}`;
    }

    async create(dto: CreateUserDto): Promise<User> {
        const user = await this.prismaService.user.create({
            data: {
                username: dto.username,
                email: dto.email,
                passwordHash: dto.passwordHash,
                birthDate: dto.birthDate,
            },
        });

        return user;
    }

    async findById(id: string): Promise<User | null> {
        const user = await this.prismaService.user.findFirst({
            where: { id },
        });

        if (user && user.avatarUrl) {
            user.avatarUrl = this.getAbsoluteAvatarUrl(user.avatarUrl);
        }

        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prismaService.user.findFirst({
            where: { email },
        });

        if (user && user.avatarUrl) {
            user.avatarUrl = this.getAbsoluteAvatarUrl(user.avatarUrl);
        }

        return user;
    }

    async findAll(): Promise<User[]> {
        const users = await this.prismaService.user.findMany();

        return users.map((user) => {
            if (user.avatarUrl) {
                user.avatarUrl = this.getAbsoluteAvatarUrl(user.avatarUrl);
            }
            return user;
        });
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const { username, email, birthDate } = updateUserDto;

        const isUserExist = await this.prismaService.user.findFirst({
            where: { id },
        });

        if (!isUserExist) {
            throw new NotFoundException(`User with id ${id} is not exist`);
        }

        const data: Prisma.UserUpdateInput = {};

        if (username) data.username = username;
        if (email) data.email = email;
        if (birthDate) data.birthDate = new Date(birthDate);

        const user = await this.prismaService.user.update({
            data,
            where: { id },
        });

        if (user.avatarUrl) {
            user.avatarUrl = this.getAbsoluteAvatarUrl(user.avatarUrl);
        }

        return user;
    }

    async remove(id: string) {
        await this.prismaService.user.delete({ where: { id } });
    }

    async updateAvatar(userId: string, filename: string) {
        const avatarRelativeUrl = `/uploads/avatars/${filename}`;

        await this.prismaService.user.update({
            where: { id: userId },
            data: { avatarUrl: avatarRelativeUrl },
        });

        return {
            avatarUrl: this.getAbsoluteAvatarUrl(avatarRelativeUrl),
        };
    }
}
