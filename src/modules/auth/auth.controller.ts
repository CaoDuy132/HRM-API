import { Controller, Post, Body, Patch, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import {
  AuthLoginDto,
  ChangePasswordDto,
  ResetPasswordDto,
  TokenLoginDto,
} from './dto';
import { ClientIp, SkipAuth, User } from 'src/common/decorators';
import { Request } from 'express';
import { SendResetPasswordDto } from './dto/send-reset-password.dto';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Post('login')
  async create(
    @Body() authLoginDto: AuthLoginDto,
    @ClientIp() clientIp: string,
    @Req() req: Request,
  ) {
    return this.authService.verifyLogin(authLoginDto, clientIp, req);
  }
  @SkipAuth()
  @Post('token')
  async checkTokenLogin(@Body() tokenLoginDto: TokenLoginDto) {
    return this.authService.checkTokenLogin(tokenLoginDto);
  }

  @SkipAuth()
  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Patch('change-password')
  changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @User() { username, userId },
  ) {
    return this.authService.changePassword(changePasswordDto, username, userId);
  }

  @SkipAuth()
  @Post('send-reset-password')
  sendResetPassword(@Body() sendResetPasswordDto: SendResetPasswordDto) {
    return this.authService.sendResetPassword(sendResetPasswordDto);
  }
}
