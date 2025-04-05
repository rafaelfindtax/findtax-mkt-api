import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Apps } from "./Apps";

@Index("app_tags_pkey", ["id"], { unique: true })
@Entity("app_tags", { schema: "public" })
export class AppTags {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

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

  @ManyToOne(() => Apps, (apps) => apps.appTags)
  @JoinColumn([{ name: "app_uuid", referencedColumnName: "appUuid" }])
  appUu: Apps;
}
