import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTaskDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('tasks')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTaskDto) {
    return this.todoService.create(createTodoDto)||{msg:"Task not created"};
  }

  @Get()
  async search(@Query('priority') priority: string, @Query('status') status: string) {
    let res= this.todoService.search({ priority, status });
    console.log("res is",res);
    return res;
  }
  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }
  

  @Put(':id')
  updatetask(){

  }

 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

}
