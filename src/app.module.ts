import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/keys';
import { LoggingMiddleware } from './user/logger.middleware';

@Module({
  imports: [CatsModule, UserModule, MongooseModule.forRoot(config.mongoURI)],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware)
    .forRoutes("/")
    // .forRoutes({ path: 'user', method: RequestMethod.GET });
  }
}