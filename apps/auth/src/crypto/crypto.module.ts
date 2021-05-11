import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CryptoService } from './crypto.service';

@Module({
  imports: [JwtModule.register({})],
  providers: [CryptoService],
  exports: [CryptoService],
})
export class CryptoModule {}
