import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-todo.dto';

export class UpdateTodoDto extends PartialType(CreateTaskDto) {}
