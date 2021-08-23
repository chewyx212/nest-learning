import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export interface JwtPayload {
  username: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(userInfo: AuthCredentialDto): Promise<void> {
    return this.userRepository.createUser(userInfo);
  }

  async signIn(userInfo: AuthCredentialDto): Promise<{ accessToken: string }> {
    const { username, password } = userInfo;
    const user = await this.userRepository.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Pleace check your login credential');
    }
  }
}
