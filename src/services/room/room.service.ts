import { RoomInterface } from '@app/dto/room/create.room.dto';
import { RoomRepository } from '@app/repo/room.repository';
import { JwtTokenService } from '@app/shared/services/JwtTokenService.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomService {
  constructor(private roomRepository: RoomRepository, private jwtTokenService: JwtTokenService) {}

  // async findAll(data: UserListQueryDto): Promise<UserInfoDto[]> {
  //   return await this.roomRepository.findAll({
  //     ...(data?.username ? { username: { $regex: data?.username, $options: 'i' } } : {}),
  //     ...(data?.address ? { address: { $regex: data?.address, $options: 'i' } } : {}),
  //     ...(data?.createAt ? { createAt: { $regex: data?.createAt, $options: 'i' } } : {}),
  //     ...(data?.dateOfBirth ? { dateOfBirth: { $regex: data?.dateOfBirth, $options: 'i' } } : {}),
  //     ...(data?.email ? { email: { $regex: data?.email, $options: 'i' } } : {}),
  //     ...(data?.fullname ? { fullname: { $regex: data?.fullname, $options: 'i' } } : {}),
  //     ...(data?.phoneNumber ? { phoneNumber: { $regex: data?.phoneNumber, $options: 'i' } } : {}),
  //     ...(data?.role ? { role: { $regex: data?.role, $options: 'i' } } : {})
  //   });
  // }

  async create(room: RoomInterface) {
    return await this.roomRepository.createNewRoom(room);
  }

  // async getMyInfo(queryUserInfo: QueryMeInfoDto) {
  //   const userInToken = await this.jwtTokenService.getUserFromToken(queryUserInfo);

  //   if (!userInToken?.user && !!userInToken.errorMessage) {
  //     throw new HttpException(
  //       {
  //         status: 400,
  //         description: userInToken.errorMessage,
  //         error_message: userInToken.errorMessage,
  //         error_detail: null,
  //         timestamp: new Date().toISOString()
  //       },
  //       HttpStatus.BAD_REQUEST
  //     );
  //   }

  //   const token = await this.jwtTokenService.createAuthToken({
  //     role: userInToken.user.role,
  //     username: userInToken.user.username
  //   });

  //   const user = await this.roomRepository.findAll({
  //     username: userInToken.user.username
  //   });
  //   if (user) {
  //     return {
  //       request_id: 'string',
  //       status: 200,
  //       response_code: 'MY_INFO_200',
  //       response_message: 'Get my info success',
  //       response_description: 'Get my info success',
  //       request_date_time: new Date().toISOString(),
  //       ...token,
  //       data: {}
  //     };
  //   } else {
  //     throw new HttpException(
  //       {
  //         request_id: 'string',
  //         status: 200,
  //         response_code: 'MY_INFO_200',
  //         response_message: 'Get my info success',
  //         response_description: `Get my info success. But do not have user with username: ${userInToken.user.username}`,
  //         request_date_time: new Date().toISOString(),
  //         ...token,
  //         data: null
  //       },
  //       HttpStatus.BAD_REQUEST
  //     );
  //   }
  // }
}
