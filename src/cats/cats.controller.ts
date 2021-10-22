import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
// import { CreateCatDto } from '../cats/dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) { }

  @Post()
  async create(@Body('name') name: string,
    @Body('age') age: number,
    @Body('breed') breed: string) {
    this.catsService.create(name, age, breed);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get('/:id')
  async findById(@Param('id') id: string): Promise<Cat> {
    return this.catsService.findById(id);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    this.catsService.delete('id');
    return `cat ${id} is deleted`;
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body('age') age: number) {
    return this.catsService.update(id, age)
  }
}