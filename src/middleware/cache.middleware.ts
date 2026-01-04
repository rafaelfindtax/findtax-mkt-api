import NodeCache from "node-cache";
import { Request, Response, NextFunction } from "express";

const cache = new NodeCache({
  stdTTL: 10, // 10 segundos
});

export function cacheMiddleware(
  key: string,
  fetcher: () => Promise<any>
) {
  return async (_req: Request, res: Response, _next: NextFunction) => {
    try {
      const cached = cache.get(key);
      if (cached) {
        return res.json(cached);
      }

      const data = await fetcher();
      cache.set(key, data);

      return res.json(data);
    } catch (err) {
      const fallback = cache.get(key);
      if (fallback) {
        return res.json(fallback);
      }

      return res
        .status(500)
        .json({ error: "Impostômetro indisponível" });
    }
  };
}
