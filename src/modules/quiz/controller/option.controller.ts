import { Body, Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateOptionDTO } from '../dto/create.option.dto';
import { OptionsService } from '../services/option.service';
import { QuestionService } from '../services/question.service';

@ApiTags('Question')
@ApiBearerAuth()
@Controller('question/option')
export class OptionController {
  constructor(
    private optionsService: OptionsService,
    private questionService: QuestionService,
  ) {}
  async saveOptionToQuestion(@Body() createOption: CreateOptionDTO) {
    const question = await this.questionService.findQuestionById(
      createOption.questionId,
    );
    const option = await this.optionsService.createOptions(
      createOption,
      question,
    );
    return { question, option };
  }
}
