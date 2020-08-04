import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Post } from "./post";

@Entity("account")
export class Account {
        @PrimaryGeneratedColumn()
        id = undefined;

        @Column("varchar", {
                length: 50,
                nullable: true
        })
        email = "";

        @Column("varchar", {
                nullable: true,
                length: 256
        })
        password = "";

        @Column("varchar", {
                nullable: true,
                length: 24
        })
        name = "";

        @Column("varchar", {
                nullable: true,
                length: 24
        })
        surname = "";

        @OneToMany(type => Post)
        posts = undefined;
}