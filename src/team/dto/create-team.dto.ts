import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsArray } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty({ example: 'Development Team' })
  @IsString()
  name: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  leaderId: number;

  @ApiProperty({ example: [2, 3, 4], type: [Number] })
  @IsArray()
  @IsInt({ each: true })
  memberIds: number[];
}
