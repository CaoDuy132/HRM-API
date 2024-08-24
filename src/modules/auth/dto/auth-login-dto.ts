import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmptyCustom, IsStringCustom } from 'src/common/decorators';

export class AuthLoginDto {
  @ApiProperty({
    type: 'string',
    example: 'name',
    required: true,
  })
  @Transform(({ value }) => (value ? value.trim() : value))
  @IsStringCustom()
  @IsNotEmptyCustom()
  username: string;
  @ApiProperty({
    type: 'string',
    example: 'password',
    required: true,
  })
  @Transform(({ value }) => (value ? value.trim() : value))
  @IsNotEmptyCustom()
  @IsStringCustom()
  password: string;
}
