import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import * as mongoose from 'mongoose';
import { AUTH_COOKIE_NAME } from '../constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          try {
            return req.cookies[AUTH_COOKIE_NAME];
          } catch (e) {
            return '';
          }
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.access as string,
    });
  }

  validate({ sub, ...userData }: any) {
    const isValid = mongoose.Types.ObjectId.isValid(sub);
    if (isValid) {
      return { id: sub, ...userData };
    }
    throw new ForbiddenException('Wrong credentials provided');
  }
}
