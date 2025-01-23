import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/infrastructure/entities/user.entity';

export class UserDto extends User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  walletAddress: string;
}
