import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOptionDTO } from '../dto/create.option.dto';
import { Options } from '../entities/option.entity';
import { Question } from '../entities/question.entity';

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(Options) private optRepo: Repository<Options>,
  ) {}

  async createOptions(
    options: CreateOptionDTO,
    question: Question,
  ): Promise<Options> {
    const newOptions = await this.optRepo.save({
      text: options.text,
      isCorrect: options.isCorrect,
    });

    question.options = [...question.options, newOptions];

    question.save();
    return newOptions;
  }
}
