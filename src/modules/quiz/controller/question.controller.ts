import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateQuestionDTO } from '../dto/create.question.dto';
import { Question } from '../entities/question.entity';
import { QuestionService } from '../services/question.service';
import { QuizService } from '../services/quiz.service';

@ApiTags('Questions')
@ApiBearerAuth()
@Controller('question')
export class QuestionController {
  constructor(
    private questionService: QuestionService,
    private quizeService: QuizService,
  ) {}

  @Post('')
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    description: 'Question added to a quiz',
    type: Question,
  })
  async saveQuestion(@Body() question: CreateQuestionDTO): Promise<Question> {
    const quiz = await this.quizeService.getQuizById(question.quizId);
    return this.questionService.createQuestion(question, quiz);
  }
}
