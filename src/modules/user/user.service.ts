import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRegisterRequestDTO } from './dto/user.register.req.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async doUserRegistration(
    userRegister: UserRegisterRequestDTO,
  ): Promise<User> {
    const user = new User();
    user.name = userRegister.name;
    user.email = userRegister.email;
    user.password = userRegister.password;
    return await this.userRepository.save(user);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async getUserById(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { id } });
  }
}
