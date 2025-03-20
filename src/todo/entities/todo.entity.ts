import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import {Status,Priority } from '../enums/todo_enum';



@Entity()
export class Todo {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: 'varchar', length: 100,nullable: false })
    title: string;
    
    @Column()
    description: string;
    
    @Column({ nullable: false})
    status: Status;

    @Column()
    priority: Priority;

    @Column()
    due_date: Date

    

    @Column({ nullable: true })
    parent_id: number;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
    
    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}
