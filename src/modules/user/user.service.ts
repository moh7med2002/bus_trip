import { Injectable, Inject } from '@nestjs/common';
import { adminRepositry, userRepositry } from 'src/constants/entityRepositry';
import {
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { generateToken } from 'src/common/generateToken';
import { VerifyPassword, hashPassword } from 'src/common/passwordUtil';
import { User } from './user.entity';
import { UserLoginDto, UserPasswordChangeDto, UserSignupDto } from './dto';
import { sendEmail } from 'src/common/sendMail';
import { Booking } from '../booking/booking.entity';
import { Trip } from '../trip/trip.entity';
import { Bus } from '../bus/bus.entity';
import { Sequelize } from 'sequelize';

@Injectable()
export class UserService {
  constructor(
    @Inject(userRepositry)
    private userRepository: typeof User,
  ) {}

  async signup(dto: UserSignupDto): Promise<{ msg: string }> {
    const { email, password, phone, name } = dto;
    const foundWithEmail = await this.userRepository.findOne({
      where: { email: email },
    });
    if (foundWithEmail) {
      throw new ForbiddenException('email already used');
    }
    const hashPas = await hashPassword(password);
    const newUser = await this.userRepository.create({
      email,
      name,
      phone,
      password: hashPas,
    });
    const mailOptions = {
      from: 'moha7medheshamabohani@gmail.com',
      to: email,
      subject: 'User account creation',
      html: `<h1>Hi Mr ${name} you now have account in our website</h1>
        <h3 style="margin:"10px 0px";">Your Email : ${email}</h3>
        <h3 style="margin:"10px 0px";">Your Password : ${password}</h3>
        <h3 style="margin:"10px 0px";">Your Phone : ${phone}</h3>
        <p style="margin:"10px 0px";">Feel free to login in our website</p>
        `,
    };
    sendEmail(mailOptions);
    return { msg: 'user account has been created' };
  }

  async login(
    dto: UserLoginDto,
  ): Promise<{ msg: string; user: User; token: string }> {
    const { email, password: bodyPassword } = dto;
    const foundWithEmail = await this.userRepository
      .scope('withoutTimeStamps')
      .findOne({
        where: { email: email },
      });
    if (!foundWithEmail) {
      throw new NotFoundException('Invalid Email');
    }
    const isPsMatch = await VerifyPassword(
      bodyPassword,
      foundWithEmail.password,
    );
    if (!isPsMatch) {
      throw new ForbiddenException('Invalid Password');
    }
    const payload = { id: foundWithEmail.id, role: 'user' };
    const access_token = generateToken(payload);
    const { password, ...others } = foundWithEmail.toJSON();
    return { msg: 'user login success', user: others, token: access_token };
  }

  async changePassword(
    userId: string | number,
    dto: UserPasswordChangeDto,
  ): Promise<{ msg: string }> {
    const user = await UserService.findById(userId);
    const isOldPs = await VerifyPassword(dto.oldPassword, user.password);
    if (!isOldPs) {
      throw new ForbiddenException('invalid old password');
    }
    const newHashPs = await hashPassword(dto.newPassword);
    user.password = newHashPs;
    await user.save();
    return { msg: 'success' };
  }

  async getProfile(userId: string | number): Promise<{ user: User }> {
    const user = await this.userRepository
      .scope('withoutPassword')
      .findByPk(userId, {
        include: [
          {
            model: Booking,
            attributes: ['id', 'seat', 'createdAt'],
            separate: true,
            order: [['createdAt', 'DESC']],
            include: [
              {
                model: Trip,
                attributes: [
                  'id',
                  'cost',
                  'day',
                  'description',
                  [
                    Sequelize.fn(
                      'IF',
                      Sequelize.literal('day > NOW()'),
                      false,
                      true,
                    ),
                    'closed',
                  ],
                ],
                include: [
                  {
                    model: Bus,
                    attributes: ['name'],
                  },
                ],
              },
            ],
          },
        ],
      });
    return { user };
  }

  async fetchAll(): Promise<{ users: User[] }> {
    const users = await this.userRepository.scope('withoutPassword').findAll();
    return { users };
  }

  //  static method
  static async findById(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new NotFoundException('Invalid user id');
    }
    return user;
  }
}
