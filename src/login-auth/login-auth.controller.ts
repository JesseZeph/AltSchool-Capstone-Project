import { Body, Controller, Post, Request, UseGuards, Ip } from '@nestjs/common';
import { LoginAuthService } from './login-auth.service';
import { LoginDto } from './dto/login.dto';
import { Prisma } from '@prisma/client';
import { RefreshJwtGuard } from 'src/auth/guards/refresh.guard';
import { MyLoggerService } from 'src/my-logger/my-logger.service';
import { Throttle } from '@nestjs/throttler/dist/throttler.decorator';

@Controller('login-auth')
export class LoginAuthController {
  constructor(private readonly loginAuthService: LoginAuthService) {}
  private readonly logger = new MyLoggerService(LoginAuthController.name);

  @Post('login')
  async login(@Ip() ip: string, @Body() dto: LoginDto) {
    //log all employees Ip address
    this.logger.log(`Request for ALL Users\t${ip}`, LoginAuthController.name);
    return await this.loginAuthService.login(dto);
  }

  @Throttle({ short: { ttl: 1000, limit: 1 } })
  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return await this.loginAuthService.refreshToken(req.user);
  }
}
