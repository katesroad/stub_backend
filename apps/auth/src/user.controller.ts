import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto, RegisterDto } from './dto';

@Controller('/users')
export class UserController {
  constructor(private readonly authService: UserService) {}

  @Get()
  renewUser() {
    return this.authService.renewUser('');
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('/logout')
  logout() {
    return this.authService.logout('');
  }
}
