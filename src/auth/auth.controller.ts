import { Body, Controller, Get, Post, Headers } from '@nestjs/common';
import { Request } from 'express';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

interface RequestWithUser extends Request {
  user: {
    email: string;
    role: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  register(
    @Body()
    registerDto: RegisterDto,
  ) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(
    @Body()
    loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }

  @Get('login')
  loginGet(
    @Body()
    loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }

  @Get('refresh')
  referesh(@Headers() headers: Headers) {
    return this.authService.refresh(headers);
  }

  @Get('logout')
  logout(@Headers() headers: Headers) {
    return this.authService.logout(headers);
  }

  @Get('profile')
  profile(user: UserActiveInterface) {
    return this.authService.profile(user);
  }
}