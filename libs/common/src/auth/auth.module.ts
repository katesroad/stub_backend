import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

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
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
