import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  Min,
  ValidateIf,
} from 'class-validator';

export class PaginationOptions {
  @ApiProperty({
    example: 1,
    required: false,
    description: 'Trang bạn muốn hiển thị',
  })
  @Type(() => Number)
  @IsOptional()
  @ValidateIf((o) => typeof o.page === 'number')
  @IsNumber()
  @Min(1, { message: 'Số trang phải lớn hơn 0' })
  page?: number = 1;

  @ApiProperty({
    example: 10,
    required: false,
    description: 'Số lượng record trong một trang',
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @Min(1, { message: 'Giá trị biến limit phải lớn hơn 0' })
  limit?: number = 10;

  @ApiProperty({ required: false, description: 'Lấy tất cả records' })
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  @IsOptional()
  getFull?: boolean = false;
}

export class PaginationOptionsV2 {
  @ApiProperty({
    example: 1,
    required: false,
    description: 'Trang bạn muốn hiển thị',
  })
  @Type(() => Number)
  @IsOptional()
  @ValidateIf((o) => typeof o.page === 'number')
  @IsNumber()
  @Min(1, { message: 'Số trang phải lớn hơn 0' })
  page?: number = 1;

  @ApiProperty({
    example: 10,
    required: false,
    description: 'Số lượng record trong một trang',
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @Min(1, { message: 'Giá trị biến limit phải lớn hơn 0' })
  size?: number = 10;

  @ApiProperty({ required: false, description: 'Lấy tất cả records' })
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  @IsOptional()
  getFull?: boolean = false;
}
