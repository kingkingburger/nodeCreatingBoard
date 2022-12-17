import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { TypeOrmConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { ChampionModule } from './champion/champion.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig), // TypeORM 설정파일 연결
    UserModule,
    ChampionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
