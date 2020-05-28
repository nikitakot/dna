import {
  Body,
  Controller, Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './todo.entity';
import { Repository } from 'typeorm';
import { TodoDto } from './todo.dto';

@Controller('todo')
export class TodoController {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  @Get()
  notes() {
    return this.todoRepository.find({ order: { createdAt: 'DESC' } });
  }

  @Post()
  createNote(@Body() todoDto: TodoDto) {
    return this.todoRepository.save(todoDto);
  }

  @Put(':id')
  async updateNote(@Param('id') id: string, @Body() todoDto: TodoDto) {
    const note = await this.todoRepository.findOne(id);
    if (!note) {
      throw new NotFoundException();
    }
    return this.todoRepository.save({ id: note.id, text: todoDto.text });
  }

  @Delete(':id')
  async deleteNote(@Param('id') id: string) {
    const note = await this.todoRepository.findOne(id);
    if (!note) {
      throw new NotFoundException();
    }
    return this.todoRepository.delete({ id });
  }
}
