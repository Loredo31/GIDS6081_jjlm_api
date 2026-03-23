import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
//import { User } from 'generated/prisma/client';
import { User } from 'generated/prisma/client';
import { CreateUserDto } from '../dto/create-user';
import { UpdateUserDto } from '../dto/update-user';
import { UtilService } from 'src/common/services/util.service';
import { AuthGuard } from 'src/common/guards/auth.guard';


@Controller('/api/user')
@UseGuards(AuthGuard)
export class UserController {
    constructor(
        private usersvc: UserService,
        private utilSvc: UtilService,
    ) {}


@Get('')
async getAllUsers(): Promise<User[]> {
    return await this.usersvc.getAllUsers();
}

@Get(':id') public async listUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const result = await this.usersvc.getUserById(id);
    console.log('Tipo de dato', typeof result);
    if (result == undefined || result == null) {
        throw new HttpException(
            `Usuario con id: ${id} no encontrado`,
            HttpStatus.NOT_FOUND,
        );
    }
    return result;
}

@Post('') 
public async insertUser(@Body() user: CreateUserDto): Promise<User> {
    const encryptedPassword = await this.utilSvc.hashPassword(user.password);
    user.password = encryptedPassword;
    const result = this.usersvc.insertUser(user);
    if (result == undefined || result == null) {
        throw new HttpException(
            `Error al insertar el usuario`,
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
    return result;
}

@Put(':id')
public async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userUpdate: UpdateUserDto,
): Promise<User> {
    return this.usersvc.updateUser(id, userUpdate);
}

@Delete(':id')
public async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    try {
        await this.usersvc.deleteUser(id);
    } catch (error) {
        throw new HttpException(
            `Error al eliminar el usuario con id: ${id}`,
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
    return true;
}
}