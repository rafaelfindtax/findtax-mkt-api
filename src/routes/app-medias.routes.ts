import { Router } from 'express';
import { AppsMediasService } from '../services/AppsMediasService';
import { authMiddleware, AuthenticatedRequest } from '../middleware/auth';

const router = Router();
const appMediasService = new AppsMediasService();

// Buscar todas as mídias
router.get('/app-medias', authMiddleware, async (req, res) => {
  try {
    const medias = await appMediasService.getAllMedias();
    res.json({ medias, message: 'Medias fetched successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching medias', error });
  }
});

// Buscar mídia por UUID
router.get('/app-medias/:uuid', authMiddleware, async (req, res) => {
  try {
    const { uuid } = req.params;
    const media = await appMediasService.getMediaByUuid(uuid);

    if (!media) {
       res.status(404).json({ message: `Media with UUID ${uuid} not found` });
    }

    res.json({ media, message: 'Media fetched successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching media', error });
  }
});

// Buscar mídias por UUID do App
router.get('/app-medias/app/:appUuid', authMiddleware, async (req, res) => {
  try {
    const { appUuid } = req.params;
    const medias = await appMediasService.getMediasByAppUuid(appUuid);

    res.json({ medias, message: 'Medias fetched successfully by app!' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching medias by app', error });
  }
});

// Criar mídia
router.post('/app-medias', authMiddleware, async (req, res) => {
  try {
    const media = await appMediasService.createMedia(req.body);
    res.status(201).json({ media, message: 'Media created successfully!' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(400).json({ message: 'Error creating media', error: errorMessage });
  }
});

// Atualizar mídia
router.put('/app-medias/:uuid', authMiddleware, async (req, res) => {
  try {
    const { uuid } = req.params;
    const updatedMedia = await appMediasService.updateMedia(uuid, req.body);

    res.json({ media: updatedMedia, message: 'Media updated successfully!' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(400).json({ message: 'Error updating media', error: errorMessage });
  }
});

// Deletar mídia
router.delete('/app-medias/:uuid', authMiddleware, async (req, res) => {
  try {
    const { uuid } = req.params;
    const deleted = await appMediasService.deleteMedia(uuid);

    if (!deleted) {
       res.status(404).json({ message: 'Media not found' });
    }

    res.json({ message: 'Media deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting media', error });
  }
});

// Atualizar updatedAt da mídia
router.patch('/app-medias/:uuid/updated-at', authMiddleware, async (req, res) => {
  try {
    const { uuid } = req.params;
    const updatedMedia = await appMediasService.updateMediaUpdatedAt(uuid);

    res.json({ media: updatedMedia, message: 'Media updatedAt updated successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating updatedAt', error });
  }
});

export default router;
