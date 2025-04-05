import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { IntegrationsMedias } from "./IntegrationsMedias";

@Index("app_integrations_pkey", ["integrationsUuid"], { unique: true })
@Entity("app_integrations", { schema: "public" })
export class AppIntegrations {
  @Column("uuid", {
    primary: true,
    name: "integrations_uuid",
    default: () => "gen_random_uuid()",
  })
  integrationsUuid: string;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

  @Column("text", { name: "description" })
  description: string;

  @Column("text", { name: "integration_url", nullable: true })
  integrationUrl: string | null;

  @Column("text", { name: "asset_id" })
  assetId: string;

  @Column("character varying", { name: "povider", nullable: true, length: 20 })
  povider: string | null;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @ManyToOne(
    () => IntegrationsMedias,
    (integrationsMedias) => integrationsMedias.appIntegrations
  )
  @JoinColumn([
    {
      name: "integrations_media_uuid",
      referencedColumnName: "integrationMediaUuid",
    },
  ])
  integrationsMediaUu: IntegrationsMedias;
}
