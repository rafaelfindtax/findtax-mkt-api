import { Router } from 'express';
import { AppMainFunctionalitiesService } from '../services/AppMainFunctionalitiesService';

const router = Router();

const appFunctionalitiesRoutes = new AppMainFunctionalitiesService();

router.get('/functionalities', async (req, res) => {
  try {
    const functionalities = await appFunctionalitiesRoutes.getAllFunctionalities();
    res.json({ functionalities , "message": "Funcionalidades fetched successfully!" });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
});

export default router;