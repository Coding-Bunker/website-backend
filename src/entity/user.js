import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("user")
export class User {
        @PrimaryGeneratedColumn()
        id = undefined;

        @Column("varchar")
        email = "";

        @Column("varchar", {
                nullable: true
        })
        password = "";

        @Column("varchar", {
                nullable: true
        })
        name = "";

        @Column("varchar", {
                nullable: true
        })
        surname = "";
}