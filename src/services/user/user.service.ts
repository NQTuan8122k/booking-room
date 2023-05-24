import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtTokenService } from '@app/shared/services/JwtTokenService.service';
import { UserRepository } from '@app/repo/user.repository';
import { UserListQueryDto } from '@app/dto/user/query.ListUser.dto';
import { UserRegisterDto } from '@app/dto/user/user.dto';
import { QueryMeInfoDto } from '@app/dto/user/query.MeInfo.dto';
import { UserInfoDto } from '@app/dto/user/user.Info.dto';
import { TokenPayloadDto } from '@app/dto/token.dto';
import { UserDao } from '@app/dao/user/user.dao';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository, private jwtTokenService: JwtTokenService) {}

  async findAll(data: UserListQueryDto): Promise<UserDao[]> {
    return await this.userRepository.findAll({
      ...(data?.username ? { username: { $regex: data?.username, $options: 'i' } } : {}),
      ...(data?.address ? { address: { $regex: data?.address, $options: 'i' } } : {}),
      ...(data?.createAt ? { createAt: { $regex: data?.createAt, $options: 'i' } } : {}),
      ...(data?.dateOfBirth ? { dateOfBirth: { $regex: data?.dateOfBirth, $options: 'i' } } : {}),
      ...(data?.email ? { email: { $regex: data?.email, $options: 'i' } } : {}),
      ...(data?.fullname ? { fullname: { $regex: data?.fullname, $options: 'i' } } : {}),
      ...(data?.phoneNumber ? { phoneNumber: { $regex: data?.phoneNumber, $options: 'i' } } : {}),
      ...(data?.role ? { role: { $regex: data?.role, $options: 'i' } } : {})
    });
  }

  async findOne(data: object): Promise<UserDao> {
    return await this.userRepository.findOne({ ...data });
  }

  async create(user: UserRegisterDto) {
    return await this.userRepository.createNewUser(user);
  }
}
