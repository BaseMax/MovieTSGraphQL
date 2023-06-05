import { Field, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class CreateGenreInput {
  @Length(1, 20)
  @Field()
  name: string;
}
