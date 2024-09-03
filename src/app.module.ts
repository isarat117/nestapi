import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TeamModule } from './team/team.module';
import { AppController } from './app/app.controller';
import { UserModule } from './user/user.module';



@Module({
  imports: [AuthModule, TeamModule, UserModule],
  controllers: [AppController],
})
export class AppModule {}
