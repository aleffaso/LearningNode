import { Exclude } from "class-transformer";
import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { v4 as uuid } from "uuid" //gerar id aleatorio

@Entity("users")
class User {

    @PrimaryColumn()
    readonly id: string;

    @Column() //Ja pega pelo nome da coluna
    name: string;

    @Column()
    email: string;

    @Column()
    admin: boolean;

    @Exclude()
    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor(){ //Associa uma classe
        if(!this.id){
            this.id = uuid();
        }
    }
}

export { User };
