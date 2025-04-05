import { Column, Entity, Index } from "typeorm";

@Index("schema_migrations_pkey", ["version"], { unique: true })
@Entity("schema_migrations", { schema: "public" })
export class SchemaMigrations {
  @Column("bigint", { primary: true, name: "version" })
  version: string;

  @Column("boolean", { name: "dirty" })
  dirty: boolean;
}
