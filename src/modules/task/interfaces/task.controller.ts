import { True } from './../../../../node_modules/@mrleebo/prisma-ast/src/lexer';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { updateTaskDto } from '../dto/update-task.dto';

@Controller('api/task')
export class TaskController {
  mysql: any;
  constructor(private taskSvc: TaskService) {}

  @Get()
  public getTasks(): Promise<Task[]> {
    return this.taskSvc.getAllTasks();
  }

  //! http://localhost:3000/api/task/1
  @Get(':id')
  public async getTaskById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Task> {
    const result = await this.taskSvc.getTaskById(id);

    if (result == undefined)
      throw new HttpException(
        `Tarea con ID ${id} no encontrada`,
        HttpStatus.NOT_FOUND,
      );

    return result;
  }

  // @Post()
  // public async insertTask(task: CreateTaskDto): Promise<Task> {
  //   const sql = `INSERT INTO task (name, description, priority, user_id) VALUES ('${task.name}', '${task.description}', ${task.priority}, ${task.user_id})`;
    
  //   const [result] = await this.mysql.query(sql);
  //   const insertId = result.insertId;

  //   return await this.getTaskById(insertId);
  // }

    @Post()
  public async insertTask(@Body() task: CreateTaskDto): Promise<Task> {
    const result = await this.taskSvc.InsertTask(task);

    if (result == undefined)
      throw new HttpException(
        `Error al insertar la tarea`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return result;
  }

  @Put(':id')
  public async updateTask(@Param("id", ParseIntPipe) id: number, @Body() task: updateTaskDto): Promise<Task> {
    return await this.taskSvc.updateTask(id, task);
  }

  @Delete(':id')
  public async deleteTask(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    try {
        await this.taskSvc.deleteTask(id);
    }catch (error) {
        throw new HttpException("Task not found", HttpStatus.NOT_FOUND);
    }
    return true;
  }
}



// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   HttpException,
//   HttpStatus,
//   Param,
//   ParseIntPipe,
//   Post,
//   Put,
// } from '@nestjs/common';
// import { TaskService } from './task.service';
// import { CreateTaskDto } from '../dto/create-task.dto';
// import { Task } from '../entities/task.entity';
// import { UpdateTaskDto } from '../dto/update-task.dto';

// @Controller('/api/task')
// export class TaskController {
//   constructor(private tasksvc: TaskService) {}

//   @Get('')
//   async getAllTasks(): Promise<Task[]> {
//     return await this.tasksvc.getAllTasks();
//   }

//   @Get(':id')
//   public async listTaskById(
//     @Param('id', ParseIntPipe) id: number,
//   ): Promise<Task> {
//     const result = await this.tasksvc.getTaskById(id);
//     console.log('Tipo de dato', typeof result);

//     if (result == undefined) {
//       throw new HttpException(
//         `Tarea con ID ${id} no encontrada`,
//         HttpStatus.NOT_FOUND,
//       );
//     }

//     return result;
//   }

//   @Post('')
//   public insertTask(@Body() task: CreateTaskDto): Promise<Task> {
//     const result = this.tasksvc.insertTask(task);

//     if (!result) {
//       throw new HttpException(
//         'Error al insertar la tarea',
//         HttpStatus.INTERNAL_SERVER_ERROR,
//       );
//     }

//     return result;
//   }

//   @Put(':id')
//   public async updateTask(
//     @Param('id', ParseIntPipe) id: number,
//     @Body() task: UpdateTaskDto,
//   ): Promise<Task> {
//     return await this.tasksvc.updateTask(id, task);
//   }

//   @Delete(':id')
//   public async deleteTask(
//     @Param('id', ParseIntPipe) id: number,
//   ): Promise<boolean> {
//     try {
//       await this.tasksvc.deleteTask(id);
//     }catch (error) {
//       throw new HttpException("Task not found", HttpStatus.NOT_FOUND);
//     }
//     return true;
//   }
// }
