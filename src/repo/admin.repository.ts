import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AdminDao } from '@app/dao/admin/admin.dao';
import { AdminEntity } from '@app/schemas/admin.schema';
import { AdminInfoDto } from '@app/dao/admin/admin.info.dto';

export class AdminRepository {
  constructor(
    @InjectModel(AdminEntity.name)
    private repository: Model<AdminDao>
  ) {}

  async createNewUser(user) {
    return await this.repository.create(user);
  }

  async findAll(data): Promise<AdminDao[]> {
    return await this.repository.find({
      ...data
    });
  }

  async findOne(data): Promise<AdminDao> {
    return await this.repository.findOne({ ...data });
  }

  async updateOne(username): Promise<any> {
    const result = await this.repository.updateOne({ username });

    return result;
  }

  async removeOne(user): Promise<any> {
    const result = await this.repository.findOneAndDelete({ id: user });

    return result;
  }
}
