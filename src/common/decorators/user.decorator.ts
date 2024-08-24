import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * @nestjs/common
 * @param key (optional) The key of the user property to extract.
 * @param ctx The execution context object.
 * @returns The user object from the request, or a specific property of the user if `key` is provided.
 * @throws {Error} if the request object or the user property is not found.
 *
 * @Controller('users')
 * export class UsersController {
 *   constructor(private readonly userService: UserService) {}
 *
 *   @Get(':id')
 *   async getUserById(@User() user: User, @Param('id') userId: string) {
 *     if (user.id === userId) {
 *       return this.userService.findOne(userId);
 *     } else {
 *       throw new UnauthorizedException(ACCESS_DENIED);
 *     }
 *   }
 *
 *   @Get('/profile')
 *   async getUserProfile(@User('email') userEmail: string) {
 *     return this.userService.findByEmail(userEmail);
 *   }
 * }
 */
export const User = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return key ? user?.[key] : user;
  },
);
