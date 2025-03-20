import { Priority, Status } from "../enums/todo_enum";

export class CreateTaskDto {

    title : string;
    description : string;
    status : Status ;
    priority : Priority;
    due_date : Date;
    parent_id : number;
    
}

