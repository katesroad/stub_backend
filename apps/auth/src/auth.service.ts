import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDoc, User } from './mongo/user.schema';
import { LoginDto, RegisterDto } from './dto';
import { CryptoService } from './crypto/crypto.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDoc>,
    private cryptoService: CryptoService,
  ) {}

  renewToken(): string {
    return 'renewed token';
  }

  //register user with email and password
  async register(registerDto: RegisterDto) {
    const { email, password } = registerDto;
    const isExisting = await this.userModel.findOne({ email });

    if (isExisting) {
      throw new BadRequestException(`Email:${email} has been registered`);
    }

    const hashedPwd = this.cryptoService.hashPwd(password);
    return this.userModel.create({ email, password: hashedPwd });
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });
    const errorMsg = 'Please check email and password.';

    if (!user) throw new BadRequestException(errorMsg);

    const isValid = this.cryptoService.comparePwd(password, user.password);
    if (!isValid) {
      throw new BadRequestException(errorMsg);
    }
  }

  logout() {
    return null;
  }
}
