import { Entity, Column, PrimaryGeneratedColumn, Timestamp, ManyToOne, OneToMany } from 'typeorm';
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

    @ManyToOne(() => Todo, todo => todo.children)
    parent: Todo;
  
    @OneToMany(() => Todo, todo => todo.parent, { cascade: true, onDelete: 'CASCADE' })
    children: Todo[];

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
    
    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}
