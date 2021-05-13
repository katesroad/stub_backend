import { LogMiddleware } from '@app/common/middlewares';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import config from './config';
import { UserController } from './user.controller';
import { UserService } from './user.service';
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
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('users');
  }
}
