import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from 'src/auth/auth.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginAuthService {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.validatUser(dto);
    const payload = {
      username: user.email,
      sub: {
        name: user.name,
      },
    };

    return {
      status: true,
      message: 'Login successful',
      data: user,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '1h',
          secret: process.env.jwtSecret,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          secret: process.env.jwtRefreshToken,
        }),
      },
    };
  }

  async validatUser(dto: LoginDto) {
    const user = await this.authService.findByEmail(dto.username);
    if (user && (await compare(dto.password, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    throw new UnauthorizedException('username or password is incorrect');
  }

  async refreshToken(user: any) {
    const payload = {
      username: user.username,
      sub: user.sub,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '20s',
        secret: process.env.jwtSecret,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.jwtRefreshToken,
      }),
    };
  }
}
