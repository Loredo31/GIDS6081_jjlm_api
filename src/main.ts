import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Pipe para realizar la validación de forma global
  app.useGlobalPipes(new ValidationPipe({
      whitelist: true, // Elimina propiedades que no están definidas en el DTO
  }),
  );

  // Configuracion de swagger
  const config = new DocumentBuilder()
    .setTitle('API con vulnerabilidades de seguridad')
    .setDescription('Documentación de la API para pruebas')
    .setVersion('1.0.0')
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

//?POSTGRES
//! npm i pg
//! npm i @types/pg

//?MySQL
//! npm install mysql2
//! npm install @types/mysql -D

//? SWAGGER
//! npm install @nestjs/swagger 