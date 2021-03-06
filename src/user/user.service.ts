import { Injectable, Logger } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user-Input';
import { UserObject } from './dto/user.object';
import { UserRepository } from './user.repository';

@Injectable() //객체를 만들어낸다. 즉 인스턴스화에서 메모리에 올린다.
export class UserService {
  private logger: Logger;
  constructor(
    // @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    this.logger = new Logger('UserService');
  }

  async userFindOne(email: string, passowrd: string): Promise<UserObject> {
    try {
      return await this.userRepository.userFindOne(email, passowrd);
    } catch (e) {
      this.logger.error('findOne Error', e);
      return null;
    }
  }

  async isEmail(email: string): Promise<boolean> {
    try {
      const isExist = await this.userRepository.isExist(email);

      return isExist;
    } catch (e) {
      console.log('isEmail Error: ', e);
      return false;
    }
  }

  async createUser(CreateUserInput: CreateUserInput): Promise<boolean> {
    try {
      const { email, password } = CreateUserInput;

      const isExist = await this.userRepository.isExist(email);

      if (!isExist) {
        await this.userRepository.createUser(email, password);
      }

      return true;
    } catch (e) {
      console.log('createUser Error: ', e);
      return false;
    }
  }
}
