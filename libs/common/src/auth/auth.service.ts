import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../interfaces';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  signUser(user: any): string {
    return this.jwtService.sign(user);
  }

  verifyToken(token: string): any {
    return this.jwtService.verify(token);
  }

  getAuthCookie(user?: IUser | null) {
    const accessExpirationTime = process.env.accessExpiresIn;
    const isProd = process.env.NODE_ENV === 'production';
    let cookie = 'Path=/';
    if (user) {
      const { access } = user;
      cookie = `access=${access};Max-Age=${accessExpirationTime}`;
    } else {
      cookie += `access=;Max-Age=0`;
    }
    if (isProd) {
      cookie += 'Secure=true;SameSite=None;HttpOnly=true';
    }
    return cookie;
  }
}
