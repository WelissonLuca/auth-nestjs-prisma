import { IsEmail } from 'class-validator';

export class LoginRequestBody {
  @IsEmail()
  email: string;
  password: string;
}
