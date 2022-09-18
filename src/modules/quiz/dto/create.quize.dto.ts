import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateQuizDTO {
  @ApiProperty({ description: 'The Title Of Quize', example: 'Nest Quiz' })
  @IsNotEmpty({ message: 'The quiz should have a title' })
  @Length(3, 255)
  title: string;

  @ApiProperty({
    description: 'Small Description Of quize',
    example: 'Nest Quiz To Test the Knowlge',
  })
  @IsNotEmpty()
  @Length(3)
  description: string;
}
