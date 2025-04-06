import { Router } from 'express';
import {AppCategoryService}  from '../services/AppCategoryService';

const router = Router();

const appCategoriesService = new AppCategoryService();

router.get('/categories', async (req, res) => {
  try {
    const categories = await appCategoriesService.getAllCategories();
    res.json({ categories , "message": "Categories fetched successfully!" });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
});

export default router;