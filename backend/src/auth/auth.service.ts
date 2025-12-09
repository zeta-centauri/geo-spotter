import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'generated/prisma/client';
import { ConfigService } from '@nestjs/config';

const HASH_SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register({ password, ...dto }: RegisterDto) {
    const isUserExists = await this.usersService.findByEmail(dto.email);

    if (isUserExists) {
      throw new ConflictException('Email already in use');
    }

    const passwordHash = await bcrypt.hash(password, HASH_SALT_ROUNDS);

    const user = await this.usersService.create({
      ...dto,
      passwordHash,
    });

    return this.generateTokens(user);
  }

  async login(dto: LoginDto) {
    const { email } = dto;

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.generateTokens(user);
  }

  async refresh(refreshToken: string) {
    const jwtRefreshSecret =
      this.configService.get<string>('JWT_REFRESH_SECRET');

    if (!jwtRefreshSecret) {
      throw new Error('JWT_SECRET not set in config');
    }

    let payload: { sub: string; email: string };

    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: jwtRefreshSecret,
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.usersService.findById(payload.sub);
    if (!user || !user.currentHashedRefreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const isValid = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );
    if (!isValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return this.generateTokens(user);
  }

  private async generateTokens(user: User) {
    const payload = { sub: user.id, email: user.email };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    const hashedRefreshToken = await bcrypt.hash(
      refreshToken,
      HASH_SALT_ROUNDS,
    );
    await this.usersService.setCurrentRefreshToken(user.id, hashedRefreshToken);

    return { accessToken, refreshToken };
  }
}
