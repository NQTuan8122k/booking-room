import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/constant';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    const getToken = async (request) => {
      const token = request.body;

      if (!token?.refreshToken || !token?.accessToken) {
        return await request;
      }
      try {
        const payload = await this.jwtService.verifyAsync(token.refreshToken, {
          secret: jwtConstants.secret
        });
        // console.log('payload', payload);

        request.user = payload;

        return request;
      } catch (e) {
        return request;
      }
    };

    const newRequest = await getToken(request);

    const user = newRequest.user;

    // console.log('0000000000000', roles, newRequest.user);

    if (!roles) {
      return true;
    }
    const hasRole = () => !!user.role == !!roles.find((item) => item === user.role);

    // console.log(
    //   'hasRole',
    //   hasRole(),
    //   roles.find((item) => {
    //     console.log('=1111', item);

    //     return item === user.role;
    //   }),
    // );

    return user && user.role && hasRole();
  }
}
