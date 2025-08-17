import { Column, Entity, Index, OneToMany } from "typeorm";
import { Accounts } from "./Accounts";

@Index("accounts_roles_role_name_key", ["roleName"], { unique: true })
@Index("accounts_roles_pkey", ["uuid"], { unique: true })
@Entity("accounts_roles", { schema: "public" })
export class AccountsRoles {
  @Column("uuid", {
    primary: true,
    name: "uuid",
    default: () => "gen_random_uuid()",
  })
  uuid: string;

  @Column("text", { name: "role_name", unique: true })
  roleName: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "now()",
  })
  createdAt: Date | null;

  @Column("timestamp without time zone", {
    name: "updated_at",
    nullable: true,
    default: () => "now()",
  })
  updatedAt: Date | null;

  @OneToMany(() => Accounts, (accounts) => accounts.accountRoles)
  accounts: Accounts[];
}
