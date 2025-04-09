import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ProviderTypes } from "./ProviderTypes";
import { Apps } from "./Apps";
import { LeisIncentivo } from "./LeisIncentivo";
import { Accounts } from "./Accounts";

@Index("app_provider_pkey", ["uuid"], { unique: true })
@Entity("app_provider", { schema: "public" })
export class AppProvider {
  @Column("uuid", {
    primary: true,
    name: "uuid",
    default: () => "gen_random_uuid()",
  })
  uuid: string;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

  @Column("text", { name: "description" })
  description: string;

  @Column("text", { name: "photo" })
  photo: string;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date;

  @Column("timestamp without time zone", {
    name: "updated_at",
    default: () => "now()",
  })
  updatedAt: Date;

  @ManyToOne(() => ProviderTypes, (providerTypes) => providerTypes.appProviders)
  @JoinColumn([
    { name: "provider_type_uuid", referencedColumnName: "providerTypeUuid" },
  ])
  providerTypeUuid: ProviderTypes;

  @OneToMany(() => Apps, (apps) => apps.appProviderUuid)
  apps: Apps[];

  @OneToMany(
    () => LeisIncentivo,
    (leisIncentivo) => leisIncentivo.appProviderUuid
  )
  leisIncentivos: LeisIncentivo[];
  @OneToMany(() => Accounts, (accounts) => accounts.appProvider)
  accounts: Accounts[];
}
