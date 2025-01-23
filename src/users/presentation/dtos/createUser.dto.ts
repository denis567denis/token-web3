import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class CreateUserResultDto {
  @ApiProperty()
  user: UserDto;

  @ApiProperty()
  authToken: string;
}

export class CreateUserDto {
  @ApiProperty()
  walletAddress: string;
}
