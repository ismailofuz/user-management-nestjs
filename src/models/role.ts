import { AutoIncrement, Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table
export class Rolesss extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column
    roleId: number;

    @Column
    name: string;
}