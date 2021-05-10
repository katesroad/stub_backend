import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  renewToken(): string {
    return this.authService.renewToken();
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  register(registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('/login')
  login(loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('/logout')
  logout() {
    return this.authService.logout();
  }
}
