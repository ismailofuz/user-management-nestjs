import { IsEmail } from 'class-validator';
import { AutoIncrement, Column, Model, PrimaryKey, Table } from 'sequelize-typescript'

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
}