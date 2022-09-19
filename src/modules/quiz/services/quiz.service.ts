import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { events } from './../../../common/events/constant';
import { Repository } from 'typeorm';
import { CreateQuizDTO } from '../dto/create.quize.dto';
import { Quiz } from '../entities/quiz.entity';
import { ResponseAddEvent } from '../events/response-add.event';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz) private quizRepository: Repository<Quiz>,
  ) {}
  async getAllQuiz(): Promise<Quiz[]> {
    return await this.quizRepository
      .createQueryBuilder('q')
      .leftJoinAndSelect('q.questions', 'qt')
      .getMany();
  }

  async getQuizById(id: number): Promise<Quiz> {
    return await this.quizRepository.findOne({
      where: { id },
      relations: ['questions', 'questions.options'],
    });
  }

  async createNewQuiz(quiz: CreateQuizDTO) {
    return await this.quizRepository.save(quiz);
  }

  async pagination(options: IPaginationOptions): Promise<Pagination<Quiz>> {
    const qb = await this.quizRepository.createQueryBuilder('q');
    qb.orderBy('q.id', 'DESC');

    return paginate<Quiz>(qb, options);
  }

  // Event Based
  @OnEvent(events.RESPONSE_SUBMITTED)
  checkQuizCompleted(payload: ResponseAddEvent) {
    console.log('checkQuizeEvent Completed', payload);
  }
}
