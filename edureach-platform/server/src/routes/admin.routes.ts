import { Router } from "express";
import adminMiddleware from "../middleware/admin.middleware.ts";
import { listAdmissions } from "../controllers/admin.controller.ts";

const router = Router();

router.get("/admissions", adminMiddleware, listAdmissions);

export default router;
