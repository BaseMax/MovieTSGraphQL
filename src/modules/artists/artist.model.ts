import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Artist {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  bio?: string;

  @Field(() => Date, { nullable: true })
  dateOfBirth?: Date;

  @Field({ nullable: true })
  avatar?: string;
}
