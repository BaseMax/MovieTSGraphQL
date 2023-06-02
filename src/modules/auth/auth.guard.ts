import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const c = ctx.getContext();
    if (this.isOptional(ctx) && !c.req.headers.authorization) {
      return true;
    }
    const token = c.req.headers?.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      c.req.user = this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
  isOptional(ctx: ExecutionContext) {
    return this.reflector.getAllAndOverride('IS_OPTIONAL_AUTH', [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
  }
}
