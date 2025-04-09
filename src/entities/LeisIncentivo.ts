import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { AppProvider } from "./AppProvider";
import { LeisMedias } from "./LeisMedias";

@Index("leis_incentivo_pkey", ["leiUuid"], { unique: true })
@Entity("leis_incentivo", { schema: "public" })
export class LeisIncentivo {
  @Column("uuid", {
    primary: true,
    name: "lei_uuid",
    default: () => "gen_random_uuid()",
  })
  leiUuid: string;

  @Column("text", { name: "title", nullable: true })
  title: string | null;

  @Column("text", { name: "subtitle", nullable: true })
  subtitle: string | null;

  @Column("text", { name: "tag", nullable: true })
  tag: string | null;

  @Column("text", { name: "proponente", nullable: true })
  proponente: string | null;

  @Column("text", { name: "objetivo", nullable: true })
  objetivo: string | null;

  @Column("text", { name: "contrapartida", nullable: true })
  contrapartida: string | null;

  @Column("text", { name: "locais_execucao", nullable: true })
  locaisExecucao: string | null;

  @Column("text", { name: "lei_photo", nullable: true })
  leiPhoto: string | null;

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

  @Column("text", { name: "publico_alvo", nullable: true })
  publicoAlvo: string | null;

  @Column("numeric", { name: "total_impactados", nullable: true })
  totalImpactados: string | null;

  @Column("numeric", { name: "investimento", nullable: true })
  investimento: string | null;

  @Column("character varying", { name: "imposto", nullable: true, length: 255 })
  imposto: string | null;

  @Column("character varying", {
    name: "area_direcionamento",
    nullable: true,
    length: 255,
  })
  areaDirecionamento: string | null;

  @ManyToOne(() => AppProvider, (appProvider) => appProvider.leisIncentivos)
  @JoinColumn([{ name: "app_provider_uuid", referencedColumnName: "uuid" }])
  appProviderUuid: AppProvider;

  @OneToMany(() => LeisMedias, (leisMedias) => leisMedias.leiUu)
  leisMedias: LeisMedias[];
}
