import { LogMiddleware } from '@app/common/middlewares';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CryptoModule } from './crypto/crypto.module';
import { MongoModule } from './mongo/mongo.module';

@Module({
  imports: [MongoModule, CryptoModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('users');
  }
}
