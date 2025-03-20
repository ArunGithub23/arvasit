import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { DeepPartial, Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { title } from 'process';

@Injectable()
export class TodoService {

  constructor
  (
    @InjectRepository(Todo)  private todoRepository: Repository<Todo>
  ) {}

  async create(createTaskDto: CreateTaskDto) {


    try {
      // console.log("create input is",createTaskDto);


      if (!createTaskDto.title||!createTaskDto.description||!createTaskDto.status||!createTaskDto.priority) {
        throw new Error("Please provide all the required fields");
      }

      const task = new Todo();
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    task.status = createTaskDto.status;
    task.priority = createTaskDto.priority;
    // console.log("okk");

    let due_date :Date = new Date(Date.parse(createTaskDto.due_date.toString()));
    task.due_date =due_date;
    task.parent_id = createTaskDto.parent_id;

    // console.log("okk1");
    return await this.todoRepository.save(task);




    } catch (error) {
      
      // console.log('error occured while creating task ',error);
      return {error:error.message};
    }

  }

  
  async search(criteria: { priority?: string; status?: string }) {
    const query = this.todoRepository.createQueryBuilder('todo');


    console.log("criteria is",criteria);
    if (criteria.priority) {
     let res1= query.andWhere('todo.priority = :priority', { priority: criteria.priority });
    //  console.log("res1 is",res1);
    }
    if (criteria.status) {
      query.andWhere('todo.status = :status', { status: criteria.status });
    }

    console.log("query is ",await query.getMany())


    return await query.getMany();
  }



 async  findOne(id: number) {

  try {
    
    if(!id){
      return {msg:"Please provide id"}
    }
    return await this.todoRepository.findOneBy({ id });

  } catch (error) {
    console.log("error occured while fetching task by id",error);
    return {error:error.message};
  }

  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  async remove(id: number) {

    try {
      
    console.log("id for delete is",id);

   let res=await this.todoRepository.delete(id);
    return {msg:"Task deleted successfully",res};
    } catch (error) {
      console.log("error occured while deleting task",error);
      return {error:error.message};
    }
  }
}
