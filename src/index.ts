import express from 'express';
import { config } from 'dotenv';
import { initializeDatabase } from './config/database';
import accountRoutes from './routes/account.routes';
import appCategoriesRoutes from './routes/app-categories.routes';
import appSubCategoriesRoutes from './routes/app-subcategories.routes';
import appProviderTypesRoutes from './routes/providerType.routes';
import appProviderService from './routes/appProvider.routes';
import appsMediasRoutes from './routes/appMedias.routes';
import appFunctionalitiesRoutes from './routes/AppMainFunctionalities.routes';
import appsRoutes  from './routes/apps.routes';
import appCategoryRelationshipsRoutes  from './routes/app-category-relationships.routes';


import cors from 'cors';

config();

const app = express();

const port = process.env.PORT || 3000;
const API_VERSION= process.env.API_VERSION || '/api/v1'


app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(API_VERSION, accountRoutes); // Monta as rotas em /api
app.use(API_VERSION, appCategoriesRoutes); 
app.use(API_VERSION, appSubCategoriesRoutes); 
app.use(API_VERSION, appProviderTypesRoutes); 
app.use(API_VERSION, appProviderService); 
app.use(API_VERSION, appFunctionalitiesRoutes);
app.use(API_VERSION, appsMediasRoutes);
app.use(API_VERSION, appsRoutes);
app.use(API_VERSION, appCategoryRelationshipsRoutes);

const startServer = async () => {
  const dbInitialized = await initializeDatabase();
  if (dbInitialized) {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } else {
    console.error('Failed to start server due to database initialization error');
  }
};

startServer();