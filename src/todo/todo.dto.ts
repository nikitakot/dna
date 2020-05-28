import { IsDefined, IsString, MinLength } from 'class-validator';

export class TodoDto {
  @IsString()
  @IsDefined()
  @MinLength(10)
  text: string;
}
