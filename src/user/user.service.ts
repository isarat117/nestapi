// user.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Get user profile by user ID
  async getUserProfile(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { contactInfo: true }, // Include contact info if needed
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
  

  // Update user profile
  async updateUserProfile(userId: number, updateUserDto: UpdateUserDto) {
    const { email, firstName, lastName, phone } = updateUserDto;

    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        email,
        contactInfo: {
          update: {
            firstName,
            lastName,
            phone,
          },
        },
      },
      include: { contactInfo: true },
    });

    return updatedUser;
  }
}
