import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {JwtModule} from '@nestjs/jwt'
import { LoggerMiddleWare } from './middlewares/middlewares/logger.middleware';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '3812',
      database: 'user-management',
      autoLoadModels: true,
      synchronize: true,
      logging: true
    }),
    SequelizeModule.forFeature([User]),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: {expiresIn: 1 * 60 * 1000}
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(LoggerMiddleWare)
        .forRoutes(UserController);
  }
}
