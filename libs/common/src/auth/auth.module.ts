import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    // access token
    JwtModule.registerAsync({
      useFactory: () => {
        const secret = process.env.access as string;
        const expiresIn = process.env.accessExpiresIn as string;
        return { secret, signOptions: { expiresIn: `${expiresIn}` } };
      },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
