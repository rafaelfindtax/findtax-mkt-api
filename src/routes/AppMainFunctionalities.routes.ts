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
       return;
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

// Rota para atualizar uma funcionalidade pelo ID
router.put('/app-main-functionalities/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const functionalityData = req.body;

    const updatedFunctionality = await appFunctionalitiesRoutes.updateFunctionality(Number(id), functionalityData);
    res.json({
      message: 'Functionality updated successfully!',
      updated: updatedFunctionality,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating functionality', error });
  }
});

// Rota para deletar uma funcionalidade pelo ID
router.delete('/app-main-functionalities/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await appFunctionalitiesRoutes.deleteFunctionality(Number(id));
    if (result) {
      res.json({ message: 'Functionality deleted successfully!' });
    } else {
      res.status(404).json({ message: 'Functionality not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting functionality', error });
  }
});

router.put('/app-main-functionalities', async (req, res) => {
  try {
    const { deleteIds, newFunctionalities, appUuid } = req.body;
    
    if (!deleteIds || !newFunctionalities || !appUuid) {
      res.status(400).json({ message: 'Missing data: deleteIds, newFunctionalities, or appUuid' });
      return
    }

    // Deleta as funcionalidades com base nos IDs
    for (const id of deleteIds) {
      await appFunctionalitiesRoutes.deleteFunctionality(id);
    }

    // Cria as novas funcionalidades
    const createdFunctionalities = await appFunctionalitiesRoutes.createFunctionalities(newFunctionalities, appUuid);

    res.status(200).json({
      message: 'Functionalities updated successfully!',
      createdFunctionalities,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating functionalities', error });
  }
});

export default router;
