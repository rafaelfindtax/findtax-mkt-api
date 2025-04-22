import { Column, Entity, Index, JoinColumn, ManyToOne , OneToMany} from "typeorm";
import { AppCategories } from "./AppCategories";


@Index("app_sub_categories_pkey", ["appSubCategoryUuid"], { unique: true })
@Entity("app_sub_categories", { schema: "public" })
export class AppSubCategories {
  @Column("uuid", {
    primary: true,
    name: "app_sub_category_uuid",
    default: () => "gen_random_uuid()",
  })
  appSubCategoryUuid: string;

  @Column("text", { name: "name" })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @ManyToOne(
    () => AppCategories,
    (appCategories) => appCategories.appCategoriesUuid,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([
    { name: "app_category_uuid", referencedColumnName: "appCategoriesUuid" },
  ])
  appCategoryUuid: AppCategories;


}
