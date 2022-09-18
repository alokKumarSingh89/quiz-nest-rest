import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUserCreds(email: string, password: string): Promise<User> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) throw new BadRequestException();
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }
    return user;
  }

  generateToken(user: User) {
    return {
      access_token: this.jwtService.sign({
        name: user.name,
        sub: user.id,
      }),
    };
  }
}
