import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Apps } from "./Apps";

@Index("apps_medias_pkey", ["appMediaUuid"], { unique: true })
@Entity("apps_medias", { schema: "public" })
export class AppsMedias {
  @Column("uuid", {
    primary: true,
    name: "app_media_uuid",
    default: () => "gen_random_uuid()",
  })
  appMediaUuid: string;

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

  @Column("uuid", { name: "app_uuid" })
  appUuid: string;

  @ManyToOne(() => Apps, (apps) => apps.appsMedias)
  @JoinColumn([{ name: "app_uuid", referencedColumnName: "appUuid" }])
  app: Apps;
}
