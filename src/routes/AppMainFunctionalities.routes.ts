// appFunctionalitiesRoutes.ts
import { Router } from 'express';
import { AppMainFunctionalitiesService } from '../services/AppMainFunctionalitiesService';

const router = Router();

const appFunctionalitiesRoutes = new AppMainFunctionalitiesService();

// Rota para buscar todas as funcionalidades
router.get('/functionalities', async (req, res) => {
  try {
    const functionalities = await appFunctionalitiesRoutes.getAllFunctionalities();
    res.json({ functionalities, message: "Funcionalidades fetched successfully!" });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching functionalities', error });
  }
});

// Rota para criar funcionalidades
router.post('/app-main-functionalities', async (req, res) => {
  try {
    const { functionalities, appUuid } = req.body;
    if (!functionalities || !appUuid) {
       res.status(400).json({ message: 'Functionalities and appUuid are required' });
       return
    }

    const createdFunctionalities = await appFunctionalitiesRoutes.createFunctionalities(functionalities, appUuid);
    res.status(201).json({
      message: 'Functionalities created successfully!',
      created: createdFunctionalities,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating functionalities', error });
  }
});

export default router;
