import { IUser } from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto, RegisterDto } from './dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly challengeModel: Model<UserDocument>,
  ) {}

  renewToken() {
    return {};
  }

  register(registerDto: RegisterDto) {
    return {};
  }

  login(loginDto: LoginDto) {
    return {};
  }

  logout() {}

  private updateUser(id: string, update: Partial<IUser>) {}
}
