import { Router } from 'express';
import { AppMainFunctionalitiesService } from '../services/AppMainFunctionalitiesService';

const router = Router();
const functionalityService = new AppMainFunctionalitiesService();

router.get('/app-main-functionalities', async (req, res) => {
  try {
    const list = await functionalityService.getAll();
    res.json({ functionalities: list, message: 'Functionalities fetched successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching functionalities', error });
  }
});

router.get('/app-main-functionalities/:appUuid', async (req, res) => {
  try {
    const list = await functionalityService.getByAppUuid(req.params.appUuid);
    res.json({ functionalities: list });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching functionalities by appUuid', error });
  }
});

router.post('/app-main-functionalities', async (req, res) => {
  try {
    const { functionalities, appUuid } = req.body;

    if (!Array.isArray(functionalities) || functionalities.length < 3) {
       res.status(400).json({ message: 'Pelo menos 3 funcionalidades são obrigatórias.' });
       return
    }

    if (!appUuid) {
       res.status(400).json({ message: 'App UUID é obrigatório.' });
       return
    }

    const createdAt = new Date();
    const updatedAt = new Date();

    const created = await Promise.all(
      functionalities.map(({ description }: { description: string }) =>
        functionalityService.create({
          description,
          appUuid,
          createdAt,
          updatedAt
        })
      )
    );

    res.status(201).json({ message: 'Funcionalidades criadas com sucesso!', created });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Erro ao criar funcionalidades', error });
  }
});

router.put('/app-main-functionalities/:id', async (req, res) => {
  try {
    const updated = await functionalityService.update(Number(req.params.id), req.body);
    if (!updated) {
       res.status(404).json({ message: 'Funcionalidade não encontrada' });
       return
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar funcionalidade', error });
  }
});

router.delete('/app-main-functionalities/:id', async (req, res) => {
  try {
    const deleted = await functionalityService.delete(Number(req.params.id));
    if (!deleted) {
       res.status(404).json({ message: 'Funcionalidade não encontrada' });
       return
    }
    res.json({ message: 'Funcionalidade removida com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar funcionalidade', error });
  }
});

export default router;
