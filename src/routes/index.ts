import { Router } from "express";
import { printWebsite } from "../controllers/print";
import expressAsyncHandler from "express-async-handler";

const router = Router();

router.post("/print", expressAsyncHandler(printWebsite));
router.get("/", (_, res) => res.status(200).json({ message: "All good!" }));

export default router;
