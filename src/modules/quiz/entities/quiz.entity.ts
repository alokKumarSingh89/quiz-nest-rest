import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {} from '@nestjs/typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Question } from './question.entity';

@Entity('quizes')
export class Quiz extends BaseEntity {
  @ApiProperty({ description: 'Primary key as Quiz ID', example: 1 })
  @PrimaryGeneratedColumn({
    comment: 'Uniq Id',
  })
  id: number;

  @ApiProperty({
    description: 'Title of the quiz',
    example: 'Sample Laravel quiz',
  })
  @Column({
    type: 'varchar',
  })
  title: string;

  @ApiProperty({
    description: 'Description of the quiz',
    example: 'Lorem ipsum',
  })
  @Column({
    type: 'text',
  })
  description: string;
  @ApiProperty({
    description: 'Quiz active or inactive state',
    example: true,
  })
  @Column({
    type: 'boolean',
    default: 1,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'List of questions',
  })
  @OneToMany('Question', 'quiz')
  questions: Question[];
}
