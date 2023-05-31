import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './entities/cat.entity';
import * as short from 'short-uuid';

@Injectable()
export class CatsService {
  private readonly cats: Record<string,Cat> = {};

  create(cat: CreateCatDto): Cat {
    const newCat = {
      ...cat,
      id: short.generate()
    };
    this.cats[newCat.id] = newCat;
    return newCat;
  }

  findOne(id: string): Cat {
    return this.cats[id];
  }

  getAll(): Cat[] {
    return Object.values(this.cats);
  }
}