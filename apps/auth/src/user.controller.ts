import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto, RegisterDto } from './dto';
import { Response } from 'express';
import { IUser } from '@app/common/interfaces';
import { AuthService, JwtGuard } from '@app/common/auth';
import { Token, User } from '@app/common';

@Controller('/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async renewUser(@Token() token:string @Res() res: Response) {
    const user = await this.userService.renewUser(token)
    return this.handleAuthedRequest(res, user);
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

  @UseGuards(JwtGuard)
  @Get('/logout')
  async logout(@User('id') userId: string, @Res() res: Response) {
    return this.userService
      .logout(userId)
      .then(() => this.handleAuthedRequest(res, null));
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
