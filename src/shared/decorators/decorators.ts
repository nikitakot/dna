import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CustomRes = createParamDecorator(
  (data: unknown, context: ExecutionContext): Response =>
    context.switchToHttp().getResponse(),
);
