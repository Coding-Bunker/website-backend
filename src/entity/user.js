import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("user")
export class User {
        @PrimaryGeneratedColumn()
        id = number;

        @Column("varchar", {length: 50})
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
}