import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  me(@CurrentUser() user: { id: string }) {
    return this.users.findById(user.id);
  }

  @Get('nickname-available')
  nicknameAvailable(@Query('nickname') nickname: string) {
    return this.users.checkNicknameAvailable(nickname);
  }
}
