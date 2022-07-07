import { IsEmail } from 'class-validator';
import { AutoIncrement, Column, Model, PrimaryKey, Table } from 'sequelize-typescript'
import { Role } from './role.enum';

@Table
export class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    userId: number;

    @Column
    fullName: string;

    @Column
    @IsEmail()
    email: string;

    @Column
    password: string;

    @Column
    role: Role[];
}