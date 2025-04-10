import { Column, Entity, Index, OneToMany } from "typeorm";
import { AccountAtalhos } from "./AccountAtalhos";

@Index("atalhos_medias_pkey", ["atalhoMediaUuid"], { unique: true })
@Entity("atalhos_medias", { schema: "public" })
export class AtalhosMedias {
  @Column("uuid", {
    primary: true,
    name: "atalho_media_uuid",
    default: () => "gen_random_uuid()",
  })
  atalhoMediaUuid: string;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

  @Column("text", { name: "asset_id" })
  assetId: string;

  @Column("character varying", { name: "povider", nullable: true, length: 20 })
  povider: string | null;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @OneToMany(
    () => AccountAtalhos,
    (accountAtalhos) => accountAtalhos.atalhoMediaUuid
  )
  accountAtalhos: AccountAtalhos[];
}
