import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../users/user.model';
import { UsersService } from '../users/users.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthPayload } from './dto/auth-payload.model';
import { LoginUserInput } from './dto/login.input';
import { RegisterUserInput } from './dto/register.input';
import { UserAuthPayload } from './dto/user.data';
import { AuthenticatedDec } from './authenticated-user.decorator';

@Resolver()
export class AuthResolver {
  constructor(
    private service: AuthService,
    private usersService: UsersService,
  ) {}

  @Mutation(() => AuthPayload)
  async register(
    @Context() ctx: any,
    @Args({ name: 'input', type: () => RegisterUserInput })
    input: RegisterUserInput,
  ) {
    const { token, user } = await this.service.register(input);
    ctx.req.user = user;
    return { token, user };
  }

  @Mutation(() => AuthPayload)
  async login(
    @Context() ctx: any,
    @Args({ name: 'input', type: () => LoginUserInput })
    input: LoginUserInput,
  ) {
    const { token, user } = await this.service.login(input);
    ctx.req.user = user;
    return { token, user };
  }

  @UseGuards(AuthGuard)
  @Query(() => User)
  async user(@AuthenticatedDec() userId: UserAuthPayload) {
    return this.usersService.getUserById(userId.id);
  }
}
