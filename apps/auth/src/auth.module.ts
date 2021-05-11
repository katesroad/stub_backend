import { LogMiddleware } from '@app/common/middlewares';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import config from './config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CryptoModule } from './crypto/crypto.module';
import { MongoModule } from './mongo/mongo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      validationSchema: Joi.object({
        token: {
          secret: Joi.string(),
          expiresIn: Joi.string(),
        },
      }),
    }),
    MongoModule,
    CryptoModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('auth');
  }
}
