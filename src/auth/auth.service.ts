import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserCreateDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async singIn(username: string, _password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user?.password !== _password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async singUp(createUserSchema: UserCreateDto): Promise<any> {
    return this.userService.createUser(createUserSchema);
  }
}
