import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt } from 'class-validator';
import { Status } from '@prisma/client';

export class UpdateInvitationDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  invitationId: number;

  @ApiProperty({ example: 'ACCEPTED', enum: Status })
  @IsEnum(Status)
  status: Status;
}
