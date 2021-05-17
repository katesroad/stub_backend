import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import * as mongoose from 'mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          try {
            console.log(req.cookies['access'], '-----');
            return req.cookies['access'];
          } catch (e) {
            return '';
          }
        },
      ]),
      secretOrKey: process.env.access as string,
    });
  }

  validate(payload: any) {
    const isValid = mongoose.Types.ObjectId.isValid(payload.sub); //true
    if (isValid) {
      return payload;
    }
    throw new ForbiddenException('Wrong credentials provided');
  }
}
