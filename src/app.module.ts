import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/database.config';
import { CategoryModule } from './modules/category/category.module';
import { AuthModule } from './auth/auth.module';
import { ItemModule } from './modules/item/item.module';

@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,
    load: [typeOrmConfig]
  }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database')
      })
    }),
    UserModule,
    CategoryModule,
    AuthModule,
    ItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
