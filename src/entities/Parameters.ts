import { Column, Entity, Index } from "typeorm";

@Index("parameters_pkey", ["uuid"], { unique: true })
@Index("parameters_key_unique", ["key"], { unique: true })
@Entity("parameters", { schema: "public" })
export class Parameters {
  @Column("uuid", {
    primary: true,
    name: "uuid",
    default: () => "gen_random_uuid()",
  })
  uuid: string;

  @Column("character varying", { name: "key", length: 255, unique: true })
  key: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("boolean", { name: "value", default: false })
  value: boolean;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "now()",
  })
  createdAt: Date | null;

  @Column("timestamp without time zone", {
    name: "updated_at",
    nullable: true,
    default: () => "now()",
  })
  updatedAt: Date | null;
}
