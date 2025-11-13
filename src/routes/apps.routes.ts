import { Router } from 'express';
import { AppsService } from '../services/AppsService';
import { authMiddleware, AuthenticatedRequest } from '../middleware/auth';

const router = Router();
const appService = new AppsService();

// Buscar todos os Apps
router.get('/apps', async (req, res) => {
  try {
    const apps = await appService.getAllAppsByProviderActive();
    res.json({ apps, message: 'Apps when provider is actived fetched successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching apps', error });
  }
});

// Buscar App por UUID
// Atualizar App
router.get('/apps/:uuid', async (req, res) => {
    try {
        const { uuid } = req.params;
        const app = await appService.getAppByUuid(uuid);
  
      
    if (!app) {
        res.status(404).json({ message: `App with UUID ${uuid} not found` });
      }
  
    res.json({ app, message: 'App fetched successfully!' });
      

    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching app', error });
    }
  });
  


// Buscar Apps por nome
router.get('/apps/name/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const apps = await appService.getAppsByName(name);

    res.json({ apps, message: 'Apps fetched successfully by name!' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching apps by name', error });
  }
});

// Buscar Apps por UUID do Provider
router.get('/apps/provider/:providerUuid', async (req, res) => {
  try {
    const { providerUuid } = req.params;
    const apps = await appService.getAppsByProviderUuid(providerUuid);

    res.json({ apps, message: 'Apps fetched successfully by provider!' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching apps by provider', error });
  }
});

// Criar App
router.post('/apps', async (req, res) => {
  try {
    const app = await appService.createApp(req.body);
    res.status(201).json({ app, message: 'App created successfully!' });
  } catch (error : any) {
    res.status(400).json({ message: 'Error creating app', error: error.message });
  }
});

// Atualizar App
router.put('/apps/:uuid', async (req, res) => {
  try {
    const { uuid } = req.params;
    const updatedApp = await appService.updateApp(uuid, req.body);

    res.json({ app: updatedApp, message: 'App updated successfully!' });
  } catch (error: any) {
    res.status(400).json({ message: 'Error updating app', error: error.message });
  }
});

router.put('/apps/:uuid', async (req, res) => {
  try {
    const { uuid } = req.params;
    const updatedApp = await appService.updateApp(uuid, req.body);

    res.json({ app: updatedApp, message: 'App updated successfully!' });
  } catch (error: any) {
    res.status(400).json({ message: 'Error updating app', error: error.message });
  }
});

router.put('/apps/:uuid/photo', async (req, res) => {
  try {
    const updated = await appService.updateAppPhoto(req.params.uuid, req.body.appPhoto);
    if (!updated) {
      res.status(404).json({ message: 'App não encontrado' });
      return;
    }
    res.json({ message: 'Foto do app atualizada com sucesso!', updated });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(400).json({ message: 'Erro ao atualizar a foto', error: errorMessage });
  }
});


// Atualizar updatedAt do App
router.patch('/apps/:uuid/updated-at', async (req, res) => {
  try {
    const { uuid } = req.params;
    const updatedApp = await appService.updateAppUpdatedAt(uuid);

    res.json({ app: updatedApp, message: 'App updatedAt updated successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating updatedAt', error });
  }
});

// 🔍 Buscar Apps pelo email da conta (Account)
router.get('/apps/account/email/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const apps = await appService.getAppsByAccountEmail(email);
    res.json({ apps, message: 'Apps fetched successfully by account email!' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching apps by account email', error });
  }
});

// 🔍 Buscar Apps pelo UUID da conta (Account)
router.get('/apps/account/uuid/:uuid', async (req, res) => {
  try {
    const { uuid } = req.params;
    const apps = await appService.getAppsByAccountUuid(uuid);
    res.json({ apps, message: 'Apps fetched successfully by account UUID!' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching apps by account UUID', error });
  }
});

export default router;
