import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CryptoService } from './crypto.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => {
        const secret = process.env.token as string;
        const expiresIn = process.env.tokenExpiresIn as string;
        return { secret, signOptions: { expiresIn: `${expiresIn}` } };
      },
    }),
  ],
  providers: [CryptoService],
  exports: [CryptoService],
})
export class CryptoModule {}
