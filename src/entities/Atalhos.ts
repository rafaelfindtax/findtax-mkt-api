import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("atalhos_pkey", ["atalhoUuid"], { unique: true })
@Entity("atalhos", { schema: "public" })
export class Atalhos {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("uuid", {
    primary: true,
    name: "atalho_uuid",
    default: () => "gen_random_uuid()",
  })
  atalhoUuid: string;

  @Column("uuid", { name: "account_uuid", nullable: true })
  accountUuid: string | null;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

  @Column("text", { name: "url", nullable: true })
  url: string | null;

  @Column("text", { name: "asset_id", nullable: true })
  assetId: string | null;

  @Column("character varying", { name: "provider", nullable: true, length: 20 })
  provider: string | null;

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
}
