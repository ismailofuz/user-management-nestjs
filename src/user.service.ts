import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/sequelize'
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UserService {

  constructor(@InjectModel(User) private readonly userModel: typeof User,
    private jwtService: JwtService) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hash = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hash;
    return this.userModel.create({ ...createUserDto });
  }

  async findOne(id: number) {
    const user = this.userModel.findOne({
      where: {
        userId: id
      }
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  findAll() {
    return this.userModel.findAll({
      order: [
        ['userId', 'ASC']
      ]
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    const user = await this.userModel.findOne({
      where: {
        userId: id
      }
    });
    if (!user) {
      throw new NotFoundException("User not found!");
    }
    const [userEdit] = await this.userModel.update(updateUserDto, {
      where: {
        userId: id
      }
    });
    return "Successfully updates!";
  }

  async delete(id: number) {
    const user = await this.userModel.findOne({
      where: {
        userId: id
      }
    });
    if (!user) {
      throw new NotFoundException("User not found!");
    }
    user.destroy();
    return "Successfully deleted!";
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({
      where: {
        email: email
      }
    });
    if (!user) {
      throw new BadRequestException("Invalid credentials!");
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new BadRequestException("Invalid credentials!");
    }

    const jwt = await this.jwtService.signAsync({ id: user.userId })

    return { accessToken: jwt };
  }
}
