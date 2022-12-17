// import { ChampionRepository } from "./repository/champion.repository";
import { Champion } from './entities/champion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ChampionService } from './champion.service';
import { ChampionController } from './champion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Champion])],
  controllers: [ChampionController],
  providers: [ChampionService],
})
export class ChampionModule {}
