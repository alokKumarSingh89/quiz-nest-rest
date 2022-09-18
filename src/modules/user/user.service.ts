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
    return await this.userRepository.save({
      name: userRegister.name,
      email: userRegister.email,
      password: userRegister.password,
    });
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async getUserById(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { id } });
  }
}
