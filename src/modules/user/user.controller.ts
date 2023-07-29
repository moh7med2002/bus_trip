import { Controller, Body, Post, UseGuards, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { roleAuthGuardFactory } from 'src/common/guards.stradegey';
import { UserLoginDto, UserPasswordChangeDto, UserSignupDto } from './dto';
import { SaveUser } from 'src/common/SaveUser';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  @UseGuards(roleAuthGuardFactory('admin'))
  signup(@Body() dto: UserSignupDto) {
    return this.userService.signup(dto);
  }

  @Post('login')
  login(@Body() dto: UserLoginDto) {
    return this.userService.login(dto);
  }

  @Get('all')
  getAllUsers() {
    return this.userService.fetchAll();
  }

  @Post('password/edit')
  @UseGuards(roleAuthGuardFactory('user'))
  changePassword(@Body() dto: UserPasswordChangeDto, @SaveUser() user: User) {
    return this.userService.changePassword(user.id, dto);
  }

  @Get('profile')
  @UseGuards(roleAuthGuardFactory('user'))
  profile(@SaveUser() user: User) {
    return this.userService.getProfile(user.id);
  }
}
