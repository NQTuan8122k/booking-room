import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/modules/auth/constant';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.body;

    if (!token?.refreshToken || !token?.accessToken) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token.accessToken, {
        secret: jwtConstants.secret,
      });

      request['user'] = payload;
    } catch (e) {
      if (e.expiredAt) {
        try {
          const payload = await this.jwtService.verifyAsync(
            token.refreshToken,
            {
              secret: jwtConstants.secret,
            },
          );

          request['user'] = payload;
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
