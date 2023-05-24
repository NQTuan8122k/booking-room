import { TokenPayloadDto } from '@app/dto/token.dto';
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
      const token = {} as TokenPayloadDto;

      //get Token from http request header
      const headerObjKeyList = Object.keys(request?.rawHeaders || {});
      for (let i = 0; i < headerObjKeyList?.length; i = i + 2) {
        const key = request?.rawHeaders[headerObjKeyList[i]];
        const value = request?.rawHeaders[headerObjKeyList[i + 1]];

        token[key] = value;
      }

      // get Token from request body
      if (!!request?.body?.accessToken) {
        token.refreshToken = request?.body?.accessToken;
      }

      if (!!request?.body?.refreshToken) {
        token.refreshToken = request?.body?.refreshToken;
      }

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
