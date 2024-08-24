import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UnauthorizedException } from '../exceptions';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../constant';
import { UserTokenService } from 'src/modules/user-token/user-token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private userTokenService: UserTokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    // #TODO check blacklist token
    try {
      const dataDecodeToken = await this.jwtService.verifyAsync(token);
      const userId = dataDecodeToken.data._id;
      const validUserToken = await this.userTokenService.validUserToken(
        userId,
        token,
      );
      dataDecodeToken.data.listFeature = validUserToken.permissions;
      request.user = dataDecodeToken.data;
    } catch (err) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
