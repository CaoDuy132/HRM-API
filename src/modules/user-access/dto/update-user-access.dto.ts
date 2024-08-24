import { PartialType } from '@nestjs/swagger';
import { CreateUserAccessDto } from './create-user-access.dto';

export class UpdateUserAccessDto extends PartialType(CreateUserAccessDto) {}
