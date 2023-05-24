import { Length } from 'class-validator';
import { TokenPayloadDto } from './../dto/token.dto';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/constant';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

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
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token.accessToken, {
        secret: jwtConstants.secret
      });

      request.user = payload;
    } catch (e) {
      if (e.expiredAt) {
        try {
          const payload = await this.jwtService.verifyAsync(token.refreshToken, {
            secret: jwtConstants.secret
          });

          request.user = payload;
        } catch (e) {
          throw new UnauthorizedException();
        }
      } else {
        throw new UnauthorizedException();
      }
    }

    return true;
  }
}
