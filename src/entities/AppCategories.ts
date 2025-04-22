import { Column, Entity, Index, OneToMany } from "typeorm";
import { AppSubCategories } from "./AppSubCategories";
import { Apps } from "./Apps";

import { AppCategoryRelationships } from "./AppCategoryRelationships";

@Index("app_categories_pkey", ["appCategoriesUuid"], { unique: true })
@Entity("app_categories", { schema: "public" })
export class AppCategories {
  @Column("uuid", {
    primary: true,
    name: "app_categories_uuid",
    default: () => "gen_random_uuid()",
  })
  appCategoriesUuid: string;

  @Column("text", { name: "name" })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @OneToMany(
    () => AppSubCategories,
    (appSubCategories) => appSubCategories.appCategoryUuid
  )
  appSubCategories: AppSubCategories[];

  @OneToMany(() => Apps, (apps) => apps.appCategoryUuid)
  apps: Apps[];
    // Novo: Categorias usadas em relacionamentos
    @OneToMany(
      () => AppCategoryRelationships,
      (relationship) => relationship.category.appCategoriesUuid
    )
    appCategoryRelationships: AppCategoryRelationships[];
}
