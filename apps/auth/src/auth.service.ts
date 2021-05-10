import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDoc, User } from './mongo/user.schema';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDoc>) {}

  renewToken(): string {
    return 'renewed token';
  }

  register(registerDto: RegisterDto) {
    return registerDto;
  }

  login(loginDto: LoginDto) {
    return loginDto;
  }

  logout() {
    return null;
  }
}
