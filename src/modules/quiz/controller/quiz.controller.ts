import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { APIPaginateResponse } from 'src/common/decorator/api.pagination.response';
import { JwtAuthGuard } from 'src/modules/auth/jwt.auth.guard';
import { Roles } from 'src/modules/auth/roles.decorator';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { CreateQuizDTO } from '../dto/create.quize.dto';
import { Quiz } from '../entities/quiz.entity';
import { QuizService } from '../services/quiz.service';

@ApiTags('Quize')
@ApiSecurity('bearer')
@Controller('quiz')
@UseGuards(JwtAuthGuard)
export class QuizController {
  constructor(private quizeService: QuizService) {}
  //   @Get('/')
  //   async getAllQuiz(): Promise<Quiz[]> {
  //     return await this.quizeService.getAllQuiz();
  //   }
  @Get('/')
  @APIPaginateResponse({ model: Quiz, description: 'List of quizzes' })
  async getAllQuiz(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(2), ParseIntPipe) limit = 2,
  ): Promise<Pagination<Quiz>> {
    const options: IPaginationOptions = { page, limit };
    return await this.quizeService.pagination(options);
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Get a quiz by id', type: Quiz })
  async getQuizById(@Param('id', ParseIntPipe) id: number): Promise<Quiz> {
    return await this.quizeService.getQuizById(id);
  }

  @ApiCreatedResponse({ description: 'The quiz that got created', type: Quiz })
  @Post('/')
  @UsePipes(ValidationPipe)
  @UseGuards(RolesGuard)
  @Roles('admin')
  async createQuiz(@Body() quizData: CreateQuizDTO): Promise<Quiz> {
    return await this.quizeService.createNewQuiz(quizData);
  }
}
