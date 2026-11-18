import { Router } from "express";
import { ParametersService } from "../services/ParametersService";

const router = Router();
const service = new ParametersService();

router.get("/parameters", async (_req, res) => {
  try {
    const parameters = await service.getAllParameters();
    res.json({ parameters, message: "Parameters fetched successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching parameters", error });
  }
});

router.get("/parameters/:key", async (req, res) => {
  try {
    const { key } = req.params;
    const parameter = await service.getParameterByKey(key);
    if (!parameter) {
      res.status(404).json({ message: `Parameter with key '${key}' not found` });
      return;
    }
    res.json({ parameter, message: "Parameter fetched successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching parameter", error });
  }
});

router.put("/parameters/:key", async (req, res) => {
  try {
    const { key } = req.params;
    const parameter = await service.toggleParameter(key);
    res.json({ parameter, message: `Parameter '${key}' toggled successfully!` });
  } catch (error: any) {
    const status = error.message?.includes("not found") ? 404 : 500;
    res.status(status).json({ message: error.message || "Error toggling parameter", error });
  }
});

export default router;
