import { Module } from '@nestjs/common';
import { QuizService } from './services/quiz.service';
import { QuizController } from './controller/quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { UserModule } from '../user/user.module';
import { QuestionController } from './controller/question.controller';
import { QuestionService } from './services/question.service';
import { OptionsService } from './services/option.service';
import { Question } from './entities/question.entity';
import { Options } from './entities/option.entity';
import { OptionController } from './controller/option.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Question, Options]), UserModule],
  providers: [QuizService, QuestionService, OptionsService],
  controllers: [QuizController, QuestionController, OptionController],
})
export class QuizModule {}
