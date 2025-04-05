import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Apps } from "./Apps";

@Index("app_main_functionalities_pkey", ["id"], { unique: true })
@Entity("app_main_functionalities", { schema: "public" })
export class AppMainFunctionalities {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "description" })
  description: string;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp without time zone", {
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @ManyToOne(() => Apps, (apps) => apps.appMainFunctionalities)
  @JoinColumn([{ name: "app_uuid", referencedColumnName: "appUuid" }])
  appUu: Apps;
}
