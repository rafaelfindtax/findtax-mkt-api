import {
  Column,
  Entity,
  Index,
  OneToMany,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  PrimaryColumn,
} from "typeorm";
import { AppRating } from "./AppRating";
import { AppProvider } from "./AppProvider";
import { AccountsRoles } from "./AccountsRoles";

@Index("accounts_email_key", ["email"], { unique: true })
@Index("accounts_pkey", ["uuid"], { unique: true })
@Entity("accounts", { schema: "public" })
export class Accounts {
  @PrimaryColumn("uuid", {
    name: "uuid",
    default: () => "gen_random_uuid()",
  })
  uuid: string;

  @Column("character varying", {
    name: "email",
    nullable: true,
    unique: true,
    length: 255,
  })
  email: string | null;

  @Column("character varying", { name: "password", length: 255 })
  password: string;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

  @Column("character varying", { name: "role", length: 25 })
  role: string;

  @Column("character varying", { name: "cargo", nullable: true, length: 255 })
  cargo: string | null;

  @Column("character varying", {
    name: "occupation",
    nullable: true,
    length: 255,
  })
  occupation: string | null;

  @Column("character varying", { name: "company", nullable: true, length: 255 })
  company: string | null;

  @Column("character varying", { name: "phone", length: 20 })
  phone: string;

  @Column("character varying", { name: "website", nullable: true, length: 200 })
  website: string | null;

  @Column("date", { name: "birth", nullable: true })
  birth: string | null;

  @Column("character varying", { name: "cep", nullable: true, length: 20 })
  cep: string | null;

  @Column("character varying", { name: "city", nullable: true, length: 100 })
  city: string | null;

  @Column("character varying", { name: "state", nullable: true, length: 100 })
  state: string | null;

  @Column("character varying", { name: "country", nullable: true, length: 100 })
  country: string | null;

  @Column("character varying", {
    name: "recovery_email",
    nullable: true,
    length: 200,
  })
  recoveryEmail: string | null;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("character varying", {
    name: "creation_source",
    nullable: true,
    length: 100,
  })
  creationSource: string | null;

  @Column("text", { name: "profile_picture", nullable: true })
  profilePicture: string | null;

  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number | null;

  @Column("timestamp with time zone", {
    name: "last_logged_at",
    nullable: true,
  })
  lastLoggedAt: Date | null;

  @OneToMany(() => AppRating, (appRating) => appRating.accountUuid)
  appRatings: AppRating[];

  @ManyToOne(() => AppProvider, (appProvider) => appProvider.accounts)
  @JoinColumn([{ name: "app_provider_uuid", referencedColumnName: "uuid" }])
  appProvider: AppProvider | null;

  @Column("enum", {
    name: "accounts_status",
    enum: ["ATIVO", "INATIVO", "BLOQUEADO"],
    default: () => "'ATIVO'",
  })
  accountsStatus: "ATIVO" | "INATIVO" | "BLOQUEADO";

  @ManyToOne(() => AccountsRoles, (accountsRoles) => accountsRoles.accounts)
  @JoinColumn([{ name: "account_roles_uuid", referencedColumnName: "uuid" }])
  accountRoles: AccountsRoles;
}
