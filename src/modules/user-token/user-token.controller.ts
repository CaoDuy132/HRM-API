import { Controller, Get, Param, Delete } from '@nestjs/common';
import { UserTokenService } from './user-token.service';

@Controller('user-token')
export class UserTokenController {
  constructor(private readonly userTokenService: UserTokenService) {}

  @Get()
  findAll() {
    return this.userTokenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userTokenService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userTokenService.remove(+id);
  }
}
