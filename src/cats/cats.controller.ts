import { Body, Controller, NotFoundException, Get, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './entities/cat.entity';

@ApiBearerAuth()
@ApiTags('cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @ApiOperation({ summary: 'Create cat' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    status: 200,
    description: 'The created record',
    type: Cat,
  })
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Cat,
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
  findOne(@Param('id') id: string): Cat {
    const result = this.catsService.findOne(id);
    if (!result) {
      throw new NotFoundException("Not such cat");
    }
    return result;
  }


  @Get('')
  @ApiResponse({
    status: 200,
    description: 'The list of all Cats',
    type: [Cat],
  })
  getAll(): Cat[] {
    return this.catsService.getAll();
  }
}