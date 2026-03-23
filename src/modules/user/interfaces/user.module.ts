 import { Module } from '@nestjs/common';
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { mysqlProvider } from 'src/common/providers/mysql.provider';
import { PrismaService } from 'src/common/services/prisma.service';
import { UtilService } from 'src/common/services/util.service';
import { JwtService } from '@nestjs/jwt';


@Module({
    controllers: [UserController],
    providers: [UserService, mysqlProvider, PrismaService, UtilService, JwtService],
})
export class UserModule {}