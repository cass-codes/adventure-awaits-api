import { Router } from "express";
import { SavingService } from "../server/SavingService";

const saveRouter = Router();

saveRouter.post("/content", (req, res, next) => {
  const { value, objectPath } = req.body;
  console.log(req.body);
  const user = SavingService.saveContent(value, objectPath);
  res.json(user);
});

export { saveRouter };
