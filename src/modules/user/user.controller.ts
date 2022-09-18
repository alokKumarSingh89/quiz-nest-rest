import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SETTINGS } from 'src/app.utils';
import { UserRegisterRequestDTO } from './dto/user.register.req.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/')
  @ApiCreatedResponse({
    description: 'Created user object as response',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'User cannot register. Try again!' })
  async doUserRegistration(
    @Body(SETTINGS.VALIDATION_PIPE) userRegister: UserRegisterRequestDTO,
  ) {
    return await this.userService.doUserRegistration(userRegister);
  }
}
