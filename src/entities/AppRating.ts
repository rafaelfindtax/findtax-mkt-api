import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Accounts } from "./Accounts";
import { Apps } from "./Apps";

@Index("app_rating_pkey", ["uuid"], { unique: true })
@Entity("app_rating", { schema: "public" })
export class AppRating {
  @Column("uuid", {
    primary: true,
    name: "uuid",
    default: () => "gen_random_uuid()",
  })
  uuid: string;

  @Column("text", { name: "comment" })
  comment: string;

  @Column("integer", { name: "stars" })
  stars: number;

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

  @ManyToOne(() => Accounts, (accounts) => accounts.appRatings)
  @JoinColumn([{ name: "account_uuid", referencedColumnName: "uuid" }])
  accountUuid: Accounts;

  @ManyToOne(() => Apps, (apps) => apps.appRatings)
  @JoinColumn([{ name: "app_uuid", referencedColumnName: "appUuid" }])
  appUuid: Apps;
}
