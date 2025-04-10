import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { LeisIncentivo } from "./LeisIncentivo";

@Index("leis_medias_pkey", ["leiMediaUuid"], { unique: true })
@Entity("leis_medias", { schema: "public" })
export class LeisMedias {
  @Column("uuid", {
    primary: true,
    name: "lei_media_uuid",
    default: () => "gen_random_uuid()",
  })
  leiMediaUuid: string;

  @Column("text", { name: "name", nullable: true })
  name: string | null;

  @Column("text", { name: "asset_id" })
  assetId: string;

  @Column("character varying", { name: "provider", nullable: true, length: 20 })
  provider: string | null;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => LeisIncentivo, (leisIncentivo) => leisIncentivo.leisMedias)
  @JoinColumn([{ name: "lei_uuid", referencedColumnName: "leiUuid" }])
  leiUuid: LeisIncentivo;
}
