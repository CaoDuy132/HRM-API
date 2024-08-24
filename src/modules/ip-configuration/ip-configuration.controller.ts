import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IpConfigurationService } from './ip-configuration.service';
import { CreateIpConfigurationDto } from './dto/create-ip-configuration.dto';
import { UpdateIpConfigurationDto } from './dto/update-ip-configuration.dto';

@Controller('ip-configuation')
export class IpConfigurationController {
  constructor(
    private readonly ipConfigurationService: IpConfigurationService,
  ) {}

  @Post()
  create(@Body() createIpConfigurationDto: CreateIpConfigurationDto) {
    return this.ipConfigurationService.create(createIpConfigurationDto);
  }

  @Get()
  findAll() {
    return this.ipConfigurationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ipConfigurationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIpConfigurationDto: UpdateIpConfigurationDto,
  ) {
    return this.ipConfigurationService.update(+id, updateIpConfigurationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ipConfigurationService.remove(+id);
  }
}
