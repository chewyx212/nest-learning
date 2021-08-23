import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthGuard } from '@nestjs/passport';

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

  @Post('/signin')
  signin(
    @Body() userInfo: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(userInfo);
  }
}
