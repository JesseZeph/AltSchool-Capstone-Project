import {
  ConflictException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { DatabaseService } from 'src/database/database.service';
import { hash } from 'bcrypt';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createAuth: Prisma.UserCreateInput) {
    if (!createAuth.password) {
      throw new BadRequestException('Password is required');
    }

    const user = await this.databaseService.user.findUnique({
      where: {
        email: createAuth.email,
      },
    });

    if (user) throw new ConflictException('Email duplicated');

    const apiKey = this.generateUniqueApiKey();

    const hashedPassword = await hash(createAuth.password, 10);

    const newUser = await this.databaseService.user.create({
      data: {
        ...createAuth,
        password: hashedPassword,
        apiKey,
      },
    });

    await this.databaseService.usedApiKey.create({
      data: {
        apiKey,
      },
    });

    return {
      status: true,
      message: 'User created successfully',
      data: newUser,
    };
  }

  private generateUniqueApiKey(): string {
    const apiKey = this.generateRandomApiKey();
    return apiKey;
  }

  private generateRandomApiKey(): string {
    const apiKeyLength = 32;
    const randomBytesBuffer = randomBytes(apiKeyLength / 2);

    const apiKey = randomBytesBuffer.toString('hex');

    return apiKey;
  }

  async isApiKeyUsed(apiKey: string): Promise<boolean> {
    const usedApiKey = await this.databaseService.usedApiKey.findUnique({
      where: {
        apiKey,
      },
    });

    return !!usedApiKey;
  }

  async isValidApiKey(apiKey: string): Promise<boolean> {
    const usedApiKey = await this.databaseService.usedApiKey.findUnique({
      where: {
        apiKey,
      },
    });

    return !!usedApiKey;
  }

  async findByEmail(email: string) {
    return await this.databaseService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findById(id: number) {
    const user = await this.databaseService.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    return {
      status: true,
      message: 'User found successfully',
      data: user,
    };
  }
}
