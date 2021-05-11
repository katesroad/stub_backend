import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CryptoService } from './crypto.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (conf: ConfigService) => {
        const { secret, expiresIn } = conf.get('token');
        return { secret, signOptions: { expiresIn: `${expiresIn}` } };
      },
    }),
  ],
  providers: [CryptoService],
  exports: [CryptoService],
})
export class CryptoModule {}
