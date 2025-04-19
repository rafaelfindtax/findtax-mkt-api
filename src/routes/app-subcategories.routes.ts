import { Router } from 'express';
import { AppSubCategoryService } from '../services/AppSubCategoryService';

const router = Router();
const service = new AppSubCategoryService();

// Listar todas
router.get('/app-subcategories', async (req, res) => {
  try {
    const list = await service.getAll();
    res.json({ subcategories: list });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar subcategorias', error });
  }
});

// Buscar por UUID
router.get('/app-subcategories/:uuid', async (req, res) => {
  try {
    const sub = await service.getById(req.params.uuid);
    if (!sub)  res.status(404).json({ message: 'Subcategoria não encontrada' });
    res.json({ subcategory: sub });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar subcategoria', error });
  }
});

// Buscar por categoria
router.get('/app-subcategories/category/:categoryUuid', async (req, res) => {
  try {
    const list = await service.getByCategory(req.params.categoryUuid);
    res.json({ subcategories: list });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar por categoria', error });
  }
});

// Criar
router.post('/app-subcategories', async (req, res) => {
  try {
    const created = await service.create(req.body);
    res.status(201).json({ subcategory: created, message: 'Criado com sucesso!' });
  } catch (error: any) {
    res.status(400).json({ message: 'Erro ao criar subcategoria', error: error.message });
  }
});

// Atualizar
router.put('/app-subcategories/:uuid', async (req, res) => {
  try {
    const updated = await service.update(req.params.uuid, req.body);
    if (!updated)  res.status(404).json({ message: 'Subcategoria não encontrada' });
    res.json({ subcategory: updated, message: 'Atualizado com sucesso!' });
  } catch (error: any) {
    res.status(400).json({ message: 'Erro ao atualizar subcategoria', error: error.message });
  }
});

// Deletar
router.delete('/app-subcategories/:uuid', async (req, res) => {
  try {
    const success = await service.delete(req.params.uuid);
    if (!success)  res.status(404).json({ message: 'Subcategoria não encontrada' });
    res.json({ message: 'Subcategoria deletada com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar subcategoria', error });
  }
});

export default router;
