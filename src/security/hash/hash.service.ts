import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

@Injectable()
export class HashService {
  async generateHash(password: string, saltOrRounds = 12): Promise<string> {
    return hash(password, saltOrRounds);
  }

  async checkPassword(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }
}
