import { Router } from "express";

const router = Router();

router.all("*", (_, res) => {
  return res.status(404).json({ message: "Route not found" });
});

export default router;
