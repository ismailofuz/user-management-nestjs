import{IsEmail, IsEnum, IsOptional, IsString} from 'class-validator'
import { Role } from 'src/models/role.enum';

export class CreateUserDto {
    @IsString()
    fullName: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsOptional()
    @IsEnum(Role)
    role: Role
}