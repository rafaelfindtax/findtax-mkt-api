import { Column, Entity, Index, OneToMany } from "typeorm";
import { AppIntegrations } from "./AppIntegrations";

@Index("integrations_medias_pkey", ["integrationMediaUuid"], { unique: true })
@Entity("integrations_medias", { schema: "public" })
export class IntegrationsMedias {
  @Column("uuid", {
    primary: true,
    name: "integration_media_uuid",
    default: () => "gen_random_uuid()",
  })
  integrationMediaUuid: string;

  @Column("text", { name: "name", nullable: true })
  name: string | null;

  @Column("text", { name: "asset_id" })
  assetId: string;

  @Column("character varying", { name: "povider", nullable: true, length: 20 })
  povider: string | null;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @OneToMany(
    () => AppIntegrations,
    (appIntegrations) => appIntegrations.integrationsMediaUuid
  )
  appIntegrations: AppIntegrations[];
}
