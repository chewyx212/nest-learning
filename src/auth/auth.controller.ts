import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { Controller, Post, Body } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('auth')
export class AuthController {
  constructor(
    @InjectRepository(UserRepository)
    private authService: AuthService,
  ) {}

  @Post('/signup')
  signUp(@Body() userInfo: AuthCredentialDto): Promise<void> {
    return this.authService.signUp(userInfo);
  }

  @Post('/login')
  login(@Body() userInfo: AuthCredentialDto): Promise<void> {
    return this.authService.signUp(userInfo);
  }
}
