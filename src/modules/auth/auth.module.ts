import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
//import { mysqlProviders } from 'src/common/providers/mysql.providers';
import { pgProviders } from 'src/common/providers/pg.providers';

@Module({
  controllers: [AuthController],
  providers: [AuthService, pgProviders],
  //providers: [AuthService, mysqlProviders, pgProviders],

})
export class AuthModule {}
