import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { LoginRequestBody } from './dto/login-request-body.dto';

@Controller('auth')
export class AuthController {
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login({ email, password }: LoginRequestBody) {
    return this.login({
      email,
      password,
    });
  }
}
