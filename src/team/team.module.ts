import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports:[
    JwtModule.register({secret:'ismailarat'})
  ],
  controllers: [TeamController],
  providers: [TeamService, PrismaService, JwtStrategy],
})
export class TeamModule {}
