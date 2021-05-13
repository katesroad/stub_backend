import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptoService {
  constructor(private readonly jwtService: JwtService) {}

  hashPwd(pwd: string): string {
    return bcrypt.hashSync(pwd, 10);
  }

  comparePwd(plainPwd: string, hashedPwd?: string): boolean {
    return bcrypt.compareSync(plainPwd, hashedPwd);
  }

  getToken(user: Record<string, unknown>): string {
    return this.jwtService.sign(user);
  }

  verifyToken(token: string): any {
    return this.jwtService.verify(token);
  }
}
