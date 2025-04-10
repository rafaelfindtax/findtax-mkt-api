import { Router } from 'express';
import { AppsMediasService } from '../services/AppsMediasService';

const router = Router();
const appsMediasRoutes = new AppsMediasService();

// GET todas as mídias
router.get('/apps-medias', async (req, res) => {
  try {
    const medias = await appsMediasRoutes.getAllMedias();
    res.json({ medias, message: 'Mídias recuperadas com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar mídias', error });
  }
});

// GET mídia por UUID
router.get('/apps-medias/:uuid', async (req, res) => {
  try {
    const media = await appsMediasRoutes.getMediaByUuid(req.params.uuid);
    if (!media) {
      res.status(404).json({ message: 'Mídia não encontrada' });
      return;
    }
    res.json(media);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar mídia', error });
  }
});

// GET mídias por App UUID
router.get('/apps-medias/by-app/:appUuid', async (req, res) => {
  try {
    const medias = await appsMediasRoutes.getMediasByAppUuid(req.params.appUuid);
    res.json(medias);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar mídias por App UUID', error });
  }
});

// POST criar nova mídia
router.post('/apps-medias', async (req, res) => {
  try {
    const created = await appsMediasRoutes.createMedia(req.body);
    res.status(201).json(created);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(400).json({ message: 'Erro ao criar mídia', error: errorMessage });
  }
});

// PUT atualizar mídia
router.put('/apps-medias/:uuid', async (req, res) => {
  try {
    const updated = await appsMediasRoutes.updateMedia(req.params.uuid, req.body);
    if (!updated) {
      res.status(404).json({ message: 'Mídia não encontrada' });
      return;
    }
    res.json(updated);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(400).json({ message: 'Erro ao atualizar mídia', error: errorMessage });
  }
});

// DELETE deletar mídia
router.delete('/apps-medias/:uuid', async (req, res) => {
  try {
    const deleted = await appsMediasRoutes.deleteMedia(req.params.uuid);
    if (!deleted) {
      res.status(404).json({ message: 'Mídia não encontrada' });
      return;
    }
    res.json({ message: 'Mídia deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar mídia', error });
  }
});

// PATCH atualizar campo updatedAt manualmente
router.patch('/apps-medias/:uuid/updated-at', async (req, res) => {
  try {
    const updated = await appsMediasRoutes.updateMediaUpdatedAt(req.params.uuid);
    if (!updated) {
      res.status(404).json({ message: 'Mídia não encontrada' });
      return;
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar data de modificação', error });
  }
});

export default router;
