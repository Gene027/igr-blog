import {
    BeforeInsert,
    Column,
    Entity,
} from "typeorm"
import { BaseEntity, generateEntityId } from "@medusajs/medusa"

@Entity()
export class Blog extends BaseEntity {
    @Column({ type: "varchar", nullable: false, default: '' })
    title: string;

    @Column({ type: "varchar", nullable: false, default: '' })
    content: string;
    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "blog")
    }
}