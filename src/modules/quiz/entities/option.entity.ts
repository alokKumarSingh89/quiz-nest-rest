import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './question.entity';

@Entity('options')
export class Options extends BaseEntity {
  @ApiProperty({
    description: 'Primary key of the options',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ description: 'The actual option', example: 'Owl' })
  @Column({
    type: 'varchar',
  })
  text: string;

  @ApiProperty({ description: 'Whether option is correct', example: true })
  @Column({
    type: 'boolean',
  })
  isCorrect: boolean;

  @ManyToOne(() => Question, (question) => question.options)
  question: Question;
}
