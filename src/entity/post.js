import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { Account } from "./account";
import { Attachment } from "./attachment";

@Entity("post")
export class Post {
        @PrimaryGeneratedColumn()
        id = undefined;

        @Column("varchar", {
                length: 100,
                nullable: false
        })
        title = "";

        @Column("varchar", {
                nullable: false,
                length: 256
        })
        description = "";
        
        @ManyToOne(type => Account)
        account = undefined;

        @OneToMany(type => Attachment)
        attachments = undefined;
}