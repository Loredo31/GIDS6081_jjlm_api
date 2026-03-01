import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { mysqlProvider } from 'src/common/providers/mysql.provider';


@Module({
  controllers: [AuthController],
  providers: [AuthService, mysqlProvider[0]],

})
export class AuthModule {}
