// src/user/dto/view-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class ViewUserDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'John' })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @ApiProperty({ example: '123-456-7890' })
  phone: string;
}
