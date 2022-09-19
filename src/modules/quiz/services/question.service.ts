import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestionDTO } from '../dto/create.question.dto';
import { Question } from '../entities/question.entity';
import { Quiz } from '../entities/quiz.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question) private questionRepo: Repository<Question>,
  ) {}

  async findQuestionById(id: number): Promise<Question> {
    return await this.questionRepo.findOne({
      where: { id },
      relations: ['quiz', 'options'],
    });
  }

  async createQuestion(
    question: CreateQuestionDTO,
    quiz: Quiz,
  ): Promise<Question> {
    const newQuestion = await this.questionRepo.save({
      question: question.question,
    });
    quiz.questions = [...quiz.questions, newQuestion];
    await quiz.save();
    return newQuestion;
  }
}
