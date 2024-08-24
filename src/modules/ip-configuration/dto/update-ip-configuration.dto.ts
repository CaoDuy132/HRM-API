import { PartialType } from '@nestjs/swagger';
import { CreateIpConfigurationDto } from './create-ip-configuration.dto';

export class UpdateIpConfigurationDto extends PartialType(
  CreateIpConfigurationDto,
) {}
