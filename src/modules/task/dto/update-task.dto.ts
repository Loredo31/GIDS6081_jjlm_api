import { IsBoolean, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateTaskDto {
  @IsOptional()
  @IsString({message: 'Debe de ser una cadena'})
  @MinLength(3, {message: 'Debe de tener al menos 3 caracteres'})
  name?: string;

  @IsOptional()
  @IsString({message: 'Debe de ser una cadena'})
  @MinLength(3, {message: 'Debe de tener al menos 3 caracteres'})
  description?: string;

  @IsOptional()
  @IsBoolean()
  priority?: boolean;
}