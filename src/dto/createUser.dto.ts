import{IsEmail, IsString} from 'class-validator'

export class CreateUserDto {
    @IsString()
    fullName: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}