import { UserRepository } from './../user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepo: UserRepository,
  ) {
    super({
      secretOrKey: 'verySecret123',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(username: string): Promise<User> {
    const user: User = await this.userRepo.findOne({ username });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
