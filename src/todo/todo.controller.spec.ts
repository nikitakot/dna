import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './todo.entity';

describe('Todo Controller', () => {
  let controller: TodoController;

  const mockRepository = jest.fn(() => ({}));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        { provide: getRepositoryToken(TodoEntity), useClass: mockRepository },
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
