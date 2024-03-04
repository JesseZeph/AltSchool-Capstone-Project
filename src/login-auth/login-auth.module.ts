import { Module } from '@nestjs/common';
import { LoginAuthService } from './login-auth.service';
import { LoginAuthController } from './login-auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [DatabaseModule],
  controllers: [LoginAuthController],
  providers: [LoginAuthService, JwtService, AuthService],
})
export class LoginAuthModule {}
