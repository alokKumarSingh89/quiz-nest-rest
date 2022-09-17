import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Quiz } from './quiz.entity';

@Entity('questions')
export class Question extends BaseEntity {
  @ApiProperty({
    description: 'The primary ID of question.',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({
    description: 'The actual question',
    example: 'What is the question?',
  })
  @Column({
    type: 'varchar',
  })
  question: string;

  @ApiProperty({
    description: 'Quiz of the question',
  })
  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz: Quiz;
}
