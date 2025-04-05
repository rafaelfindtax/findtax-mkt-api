import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Apps } from "./Apps";

@Index("app_functionalities_pkey", ["id"], { unique: true })
@Entity("app_functionalities", { schema: "public" })
export class AppFunctionalities {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("timestamp without time zone", {
    name: "updated_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date | null;

  @Column("character varying", {
    name: "type",
    length: 255,
    default: () => "'Gestão de documentos'",
  })
  type: string;

  @ManyToOne(() => Apps, (apps) => apps.appFunctionalities)
  @JoinColumn([{ name: "app_uuid", referencedColumnName: "appUuid" }])
  appUu: Apps;
}
