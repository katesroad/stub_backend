import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../interfaces';
import { AUTH_COOKIE_NAME } from './constant';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  signUser({ id, ...userData }: any): string {
    return this.jwtService.sign({ sub: id, ...userData });
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
      cookie = `${AUTH_COOKIE_NAME}=${access};Max-Age=${accessExpirationTime}`;
    } else {
      cookie += `${AUTH_COOKIE_NAME}=;Max-Age=0`;
    }
    if (isProd) {
      cookie += 'Secure=true;SameSite=None;HttpOnly=true';
    }
    return cookie;
  }
}
