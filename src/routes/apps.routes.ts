import { Router } from 'express';
import { AppsService } from '../services/AppsService';

const router = Router();
const appsService = new AppsService();

// Buscar todos os apps
router.get('/apps', async (req, res) => {
  try {
    const apps = await appsService.getAllApps();
    res.json({ apps, message: 'Apps fetched successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching apps', error });
  }
});

// Buscar app por UUID
router.get('/apps/:uuid', async (req, res) => {
  try {
    const app = await appsService.getAppByUuid(req.params.uuid);
    if (!app) {
       res.status(404).json({ message: 'App not found' });
       return
    }
    res.json(app);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching app', error });
  }
});

// Buscar apps por nome
router.get('/apps-by-name/:name', async (req, res) => {
  try {
    const apps = await appsService.getAppsByName(req.params.name);
    res.json(apps);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching apps by name', error });
  }
});

// Buscar apps por provider UUID
router.get('/apps-by-provider/:providerUuid', async (req, res) => {
  try {
    const apps = await appsService.getAppsByProviderUuid(req.params.providerUuid);
    res.json(apps);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching apps by provider UUID', error });
  }
});

// Criar novo app
router.post('/apps', async (req, res) => {
  try {
    const newApp = await appsService.createApp(req.body);
    res.status(201).json(newApp);
  } catch (error) {
    res.status(400).json({ message: 'Error creating app', error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Atualizar app
router.put('/apps/:uuid', async (req, res) => {
  try {
    const updatedApp = await appsService.updateApp(req.params.uuid, req.body);
    res.json(updatedApp);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(400).json({ message: 'Error updating app', error: errorMessage });
  }
});

// Deletar app
router.delete('/apps/:uuid', async (req, res) => {
  try {
    const deleted = await appsService.deleteApp(req.params.uuid);
    res.json({ deleted });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ message: 'Error deleting app', error: errorMessage });
  }
});

// Atualizar o campo updatedAt
router.patch('/apps/:uuid/update-timestamp', async (req, res) => {
  try {
    const updated = await appsService.updateAppUpdatedAt(req.params.uuid);
    res.json(updated);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ message: 'Error updating timestamp', error: errorMessage });
  }
});

export default router;
