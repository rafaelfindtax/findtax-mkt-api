import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { AtalhosMedias } from "./AtalhosMedias";

@Index("account_atalhos_pkey", ["atalhoUuid"], { unique: true })
@Entity("account_atalhos", { schema: "public" })
export class AccountAtalhos {
  @Column("uuid", {
    primary: true,
    name: "atalho_uuid",
    default: () => "gen_random_uuid()",
  })
  atalhoUuid: string;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

  @Column("text", { name: "atalho_url" })
  atalhoUrl: string;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @ManyToOne(
    () => AtalhosMedias,
    (atalhosMedias) => atalhosMedias.accountAtalhos
  )
  @JoinColumn([
    { name: "atalho_media_uuid", referencedColumnName: "atalhoMediaUuid" },
  ])
  atalhoMediaUuid: AtalhosMedias;
}
