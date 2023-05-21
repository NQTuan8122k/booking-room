import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenType } from 'src/constants/token-type';
import { jwtConstants } from '../../constants/constant';
import { TokenPayloadDto } from 'src/dto/token.dto';

@Injectable()
export class JwtTokenService {
  constructor(private jwtService: JwtService) {}

  async createAuthToken(data: {
    role: string;
    username: string;
  }): Promise<TokenPayloadDto> {
    return new TokenPayloadDto({
      accessToken: await this.jwtService.signAsync(
        {
          expiresIn: '3600s',
          username: data.username,
          type: TokenType.ACCESS_TOKEN,
          role: data.role,
        },
        { expiresIn: '3600s' },
      ),

      refreshToken: await this.jwtService.signAsync(
        {
          expiresIn: '86400s',
          username: data.username,
          type: TokenType.ACCESS_TOKEN,
          role: data.role,
        },
        { expiresIn: '86400s' },
      ),
    });
  }

  async getUserFromToken(data: {
    accessToken: string;
    refreshToken: string;
  }): Promise<{
    user: null | {
      expiresIn: string;
      username: string;
      type: string;
      role: string;
    };
    errorMessage?: string;
  }> {
    if (!data?.refreshToken || !data?.accessToken) {
      return {
        user: null,
        errorMessage: 'Missing refreshToken or accessToken',
      };
    }
    try {
      const payload = await this.jwtService.verifyAsync(data.accessToken, {
        secret: jwtConstants.secret,
      });

      return { user: payload };
    } catch (e) {
      if (e.expiredAt) {
        try {
          const payload = await this.jwtService.verifyAsync(data.refreshToken, {
            secret: jwtConstants.secret,
          });

          return { user: payload };
        } catch {}
      }
    }
    return {
      user: null,
      errorMessage: 'Something error when get user from token',
    };
  }
}
