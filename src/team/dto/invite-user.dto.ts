import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class InviteUserDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  teamId: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  userId: number;
}
