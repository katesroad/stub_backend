import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from '@app/common/interfaces';
import { UserDoc, User } from './mongo/user.schema';
import { LoginDto, RegisterDto } from './dto';
import { CryptoService } from './crypto/crypto.service';
import { AuthService } from '@app/common/auth';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDoc>,
    private cryptoService: CryptoService,
    private authService: AuthService,
  ) {}

  async renewUser(token: string): Promise<IUser> {
    const user = await this.userModel
      .findOne({ token })
      .then((userDoc) => (userDoc ? userDoc.toJSON() : null));

    if (!user || !this.cryptoService.verifyToken(user?.token)) {
      throw new UnauthorizedException(`Invalid request`);
    }

    return this.cleanUser(user);
  }

  async register(registerDto: RegisterDto): Promise<IUser> {
    const { email, password } = registerDto;
    const isExisting = await this.userModel.findOne({ email });

    if (isExisting) {
      throw new BadRequestException(`Email:${email} has been registered`);
    }

    const hashedPwd = this.cryptoService.hashPwd(password);
    return this.userModel
      .create({ email, password: hashedPwd })
      .then((userDoc) => userDoc.toJSON())
      .then((user) => this.cleanUser(user));
  }

  async login(loginDto: LoginDto): Promise<IUser> {
    const { email, password } = loginDto;
    const user = await this.userModel
      .findOne({ email })
      .then((userDoc) => (userDoc ? userDoc.toJSON() : null));

    if (!user || !this.cryptoService.comparePwd(password, user.password)) {
      throw new BadRequestException('Please check email and password.');
    }

    return this.cleanUser(user);
  }

  async logout(userId: string) {
    return this.userModel.updateOne({ _id: userId }, { $set: { token: null } });
  }

  private async cleanUser({ _id, username, email }: any): Promise<IUser> {
    const userData = { id: _id, email, username };
    const token = this.cryptoService.getToken(userData);
    const access = this.authService.signUser(userData);
    await this.userModel.updateOne({ _id }, { $set: { token } });
    return { ...userData, token, access };
  }
}
