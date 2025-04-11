import { Router } from 'express';
import { AppProviderService } from '../services/AppProviderService';

const router = Router();
const appProviderService = new AppProviderService();

router.get('/app-providers', async (req, res) => {
  try {
    const providers = await appProviderService.getAll();
    res.json({ providers, message: 'Providers fetched successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching providers', error });
  }
});

router.get('/app-providers/:uuid', async (req, res) => {
  try {
    const provider = await appProviderService.getByUuid(req.params.uuid);
    if (!provider) {    
     res.status(404).json({ message: 'Provider not found' });
     return
    }
    res.json(provider);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching provider', error });
  }
});

router.post('/app-providers', async (req, res) => {
  try {
    const created = await appProviderService.create(req.body);
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: 'Error creating provider', error });
  }
});

router.put('/app-providers/:uuid', async (req, res) => {
  try {
    const updated = await appProviderService.update(req.params.uuid, req.body);
    if (!updated) {
       res.status(404).json({ message: 'Provider not found' });
       return
    }
    res.json(updated);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error updating provider', error });
  }
});

router.delete('/app-providers/:uuid', async (req, res) => {
  try {
    const deleted = await appProviderService.delete(req.params.uuid);
    if (!deleted) {
    res.status(404).json({ message: 'Provider not found' });
      return
    }
    res.json({ message: 'Provider deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting provider', error });
  }
});

export default router;
