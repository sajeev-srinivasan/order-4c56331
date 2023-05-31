import { ApiProperty } from '@nestjs/swagger';

export class Cat {
  @ApiProperty({ description: 'The Cat identifier' })
  id: string;

  @ApiProperty({ example: 'Bob', description: 'The Cat name' })
  name: string;

  @ApiProperty({ example: 1, description: 'The age of the Cat' })
  age: number;

  @ApiProperty({
    example: 'Maine Coon',
    description: 'The breed of the Cat',
  })
  breed: string;
}