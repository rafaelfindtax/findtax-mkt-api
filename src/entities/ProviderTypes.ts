import { Column, Entity, Index, OneToMany } from "typeorm";
import { AppProvider } from "./AppProvider";

@Index("provider_types_pkey", ["providerTypeUuid"], { unique: true })
@Entity("provider_types", { schema: "public" })
export class ProviderTypes {
  @Column("uuid", {
    primary: true,
    name: "provider_type_uuid",
    default: () => "gen_random_uuid()",
  })
  providerTypeUuid: string;

  @Column("text", { name: "name" })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @OneToMany(() => AppProvider, (appProvider) => appProvider.providerTypeUu)
  appProviders: AppProvider[];
}
