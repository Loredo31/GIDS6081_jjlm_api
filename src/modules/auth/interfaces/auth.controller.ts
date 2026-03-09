import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authSvc: AuthService) {}

    //Post /auth/register  - 201 Created

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  public login(@Body() loginDto: LoginDto): string {
    const {username, password}= loginDto;
     // TODOS: Verifica el usuario y contraseña

     // TODO: Obtener la información del usuario (payload)

     // TODO: Generar el JWT

     // TODO: Devolver el JWT encriptado
    return this.authSvc.login();
  }

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