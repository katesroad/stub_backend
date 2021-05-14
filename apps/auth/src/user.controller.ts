import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto, RegisterDto } from './dto';
import { Response } from 'express';
import { IUser } from '@app/common/interfaces';
import { AuthService } from '@app/common/auth';

@Controller('/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  renewUser() {
    return this.userService.renewUser('');
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async register(@Body() registerDto: RegisterDto, @Res() res: Response) {
    const user = await this.userService.register(registerDto);
    return this.handleAuthedRequest(res, user);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const user = await this.userService.login(loginDto);
    return this.handleAuthedRequest(res, user);
  }

  @Get('/logout')
  async logout(@Res() res: Response) {
    const user = null;
    return this.handleAuthedRequest(res, user);
  }

  private async handleAuthedRequest(
    res: Response,
    user?: IUser | null,
  ): Promise<void> {
    const accessCookie = this.authService.getAuthCookie(user);
    res.setHeader('Set-Cookie', [accessCookie]);
    res.json(user);
  }
}
