import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    Column,
  } from 'typeorm';
  import { Apps } from './Apps';
  import { AppCategories } from './AppCategories';
  import { AppSubCategories } from './AppSubCategories';
  
  @Entity('app_category_relationships', { schema: 'public' })
  export class AppCategoryRelationships {
    @PrimaryGeneratedColumn('uuid', { name: 'app_category_relationship_uuid' })
    appCategoryRelationshipUuid: string;
  
    @ManyToOne(() => Apps, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'app_uuid', referencedColumnName: 'appUuid' })
    app: Apps;
  
    @ManyToOne(() => AppCategories, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'app_categories_uuid', referencedColumnName: 'appCategoriesUuid' })
    category: AppCategories;
  
    @ManyToOne(() => AppSubCategories, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'app_sub_category_uuid', referencedColumnName: 'appSubCategoryUuid' })
    subCategory: AppSubCategories;
  }
  