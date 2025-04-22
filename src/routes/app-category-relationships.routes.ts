import { Router } from 'express';
import { AppCategoryRelationshipsService } from '../services/AppCategoryRelationshipsService';

const router = Router();
const service = new AppCategoryRelationshipsService();

router.get('/category/relationships', async (_req, res) => {
  try {
    const data = await service.getAll();
    res.json({ data });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch relationships', error });
  }
});

router.get('/category/relationships/:appCategoryRelationshipUuid', async (req, res) => {
  try {
    const { appCategoryRelationshipUuid } = req.params;
    const data = await service.getById(appCategoryRelationshipUuid);
    if (!data)  res.status(404).json({ message: 'Relationship not found' });
    res.json({ data });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching relationship', error });
  }
});

router.post('/category/relationships', async (req, res) => {
  try {
    const created = await service.create(req.body);
    res.status(201).json({ created });
  } catch (error) {
    res.status(400).json({ message: 'Error creating relationship', error });
  }
});

router.put('/category/relationships/:appCategoryRelationshipUuid', async (req, res) => {
  try {
    const { appCategoryRelationshipUuid } = req.params;
    const updated = await service.update(appCategoryRelationshipUuid, req.body);
    res.json({ updated });
  } catch (error) {
    res.status(400).json({ message: 'Error updating relationship', error });
  }
});

router.delete('/category/relationships/:appCategoryRelationshipUuid', async (req, res) => {
  try {
    const { appCategoryRelationshipUuid } = req.params;
    const deleted = await service.delete(appCategoryRelationshipUuid);
    res.json({ deleted });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting relationship', error });
  }
});

router.get('/category/relationships/app/:appUuid', async (req, res) => {
    try {
      const { appUuid } = req.params;
      const data = await service.getByAppUuid(appUuid);
      res.json({ data });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching relationships by app', error });
    }
  });

export default router;
