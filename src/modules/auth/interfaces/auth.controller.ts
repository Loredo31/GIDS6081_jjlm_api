import { Body,Controller, Get, HttpCode, HttpException, HttpStatus, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { User } from 'src/modules/user/entities/user.entity';
import { ApiOperation } from '@nestjs/swagger';
import { UtilService } from 'src/common/services/util.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authSvc: AuthService,
              private readonly utilSvc: UtilService
  ) {}


@Post('/login')
@HttpCode(HttpStatus.OK)
public async login(@Body() login: LoginDto): Promise<any> {
    const {username, password} = login;

    const user = await this.authSvc.getUserByUserName(username);
    if (!user)
        throw new UnauthorizedException('El usuario y/o contraseña incorrecto')

    if (await this.utilSvc.checkPassword(password, user.password!)) {
        // Obtener la información del usuario (payload)
        const {password, username, ...payload} = user;

        // Genera el JWT
        const access_token = await this.utilSvc.generateJWT(payload);

        // Generar el refresh token
        const refresh_token = await this.utilSvc.generateJWT(payload, '7d');

        // Devolver el JWT encriptado
        return {
            access_token,
            refresh_token
        }

    } else {
        throw new UnauthorizedException('El usuario y/o contraseña es incorrecta')
    }
}

    //Post /auth/register  - 201 Created

//     @Post('login')
// @ApiOperation({ summary: 'Login de usuario' })
// public async login(@Body() user: LoginDto): Promise<User> {

//     const result = await this.authSvc.login(user);

//     if (result == undefined || result == null) {
//         throw new HttpException(
//             `Usuario o contraseña incorrectos`,
//             HttpStatus.UNAUTHORIZED,
//         );
//     }

//     return result;
// }

  // @Post('/login')
  // @HttpCode(HttpStatus.OK)
  // public login(@Body() loginDto: LoginDto): string {
  //   const {username, password}= loginDto;
  //    // TODOS: Verifica el usuario y contraseña

  //    // TODO: Obtener la información del usuario (payload)

  //    // TODO: Generar el JWT

  //    // TODO: Devolver el JWT encriptado
  //   return this.authSvc.login();
  // }

  @Get("/me")
  public getProfile() {

  }

  @Post('/register')
  public refreshToken() {
    
  }

  @Post('/logout')
  public logout() {
  
  }
}