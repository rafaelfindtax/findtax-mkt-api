import { Router } from 'express';
import { ProviderTypeService } from '../services/ProviderTypeService';

const router = Router();
const providerTypeService = new ProviderTypeService();

router.get('/provider-types', async (req, res) => {
  try {
    const providerTypes = await providerTypeService.getAllProviderTypes();
    res.json({ providerTypes, message: 'Provider types fetched successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching provider types', error });
  }
});


router.post('/provider-types', async (req, res) => {
  try {
    const newType = await providerTypeService.createProviderType(req.body);
    res.status(201).json(newType);
  } catch (error) {
    res.status(500).json({ message: 'Error creating provider type', error });
  }
});

router.put('/provider-types/:uuid', async (req, res) => {
  try {
    const updated = await providerTypeService.updateProviderType(req.params.uuid, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating provider type', error });
  }
});

router.delete('/provider-types/:uuid', async (req, res) => {
  try {
    const deleted = await providerTypeService.deleteProviderType(req.params.uuid);
    res.json({ deleted });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting provider type', error });
  }
});

export default router;
