import {
    Column,
    Entity,
} from "typeorm"
import { BaseEntity } from "@medusajs/medusa"

@Entity()
export class Blog extends BaseEntity {
    @Column({ type: "varchar", nullable: false, default: '' })
    title: string;

    @Column({ type: "varchar", nullable: false, default: '' })
    content: string;
}