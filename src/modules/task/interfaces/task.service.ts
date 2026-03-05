import { Inject, Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { updateTaskDto } from '../dto/update-task.dto';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class TaskService {
  constructor(
    @Inject('MYSQL_CONNECTION') private mysql: any,
    private prisma: PrismaService
    // @Inject('PG_CONNECTION') private pg: any,
  ) {}

  public async getAllTasks(): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    return tasks;
    // const query = 'SELECT * FROM tasks ORDER BY name ASC';
    // const [results] = await this.mysql.query(query);
    // return results as Task[];
  }

  public async getTaskById(id: number): Promise<Task | null> {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });
    return task
  }

  public async InsertTask(task: CreateTaskDto): Promise<Task> {
    const newTask = await this.prisma.task.create({
      data : task
    });
    return newTask;
  }

  public async updateTask(id: number, taskUpdate: updateTaskDto): Promise<Task> {
    const task = await this.prisma.task.update({
      where: { id },
      data: taskUpdate, 
    });
    return task;
  }

  public async deleteTask(id: number): Promise<Task> {
    const task = await this.prisma.task.delete({
      where: { id },
    });
    return task;
  }
}





// import { Inject, Injectable } from '@nestjs/common';
// import { Task } from '../entities/task.entity';
// import { CreateTaskDto } from '../dto/create-task.dto';
// import { UpdateTaskDto } from '../dto/update-task.dto';
// import { PrismaService } from 'src/common/services/prisma.service';


// @Injectable()
// export class TaskService {
//   constructor(
//     @Inject('MYSQL_CONNECTION') private mysql: any,
//     private prisma: PrismaService
//   ) {}

//   //Get all tasks
//   public async getAllTasks(): Promise<Task[]> {
//     const tasks = await this.prisma.task.findMany({
//       orderBy: {
//         name: 'asc',
//       },
//     });

//     return tasks;

//   }

//   //Get task by ID
//   public async getTaskById(id: number): Promise<Task | null> {
//     const task = await this.prisma.task.findUnique({
//       where: {id: id}
//     });

//     return task;
//   }

//   //Insert a new task
//   public async insertTask(task: CreateTaskDto): Promise<Task> {
//     const newTask = await this.prisma.task.create({
//       data: task
//     });

//     return newTask;
//   }

//   //Update a task
//   public async updateTask(id: number,taskUpdate: UpdateTaskDto,) : Promise<Task> {
//     const task = await this.prisma.task.update({
//       where: {id},
//       data:taskUpdate
//     });

//     return task;
//   }

//   //Delete a task
//   public async deleteTask(id: number): Promise<Task> {
//     const task = await this.prisma.task.delete({
//       where: {id}
//     });

//     return task;
//   }
// }