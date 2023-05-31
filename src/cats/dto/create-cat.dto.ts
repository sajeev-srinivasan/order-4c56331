import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateCatDto {
  @IsString()
  @ApiProperty({ example: 'Jerry', description: 'The name of the Cat' })
  readonly name: string;

  @IsInt()
  @ApiProperty({ example: 1, description: 'The age of the Cat' })
  readonly age: number;

  @IsString()
  @ApiProperty({ example: 'persian', description: 'The breed of the Cat' })
  readonly breed: string;
}