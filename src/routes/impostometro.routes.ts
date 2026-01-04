import { fetchImpostometro } from "../services/ImpostometroService";
import { cacheMiddleware } from "../middleware/cache.middleware";

import { Router } from 'express';

const router = Router();

// Buscar todos os Apps
router.get(
  "/impostometro",
  cacheMiddleware("impostometro", fetchImpostometro)
);

export default router;
