import type { Request, Response, NextFunction } from "express";

const adminMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const configuredKey = process.env.ADMIN_DASHBOARD_KEY;
  const providedKey = req.header("x-admin-key");

  if (!configuredKey) {
    res.status(503).json({
      success: false,
      message: "Admin dashboard is not configured. Set ADMIN_DASHBOARD_KEY on the server.",
    });
    return;
  }

  if (!providedKey || providedKey !== configuredKey) {
    res.status(401).json({ success: false, message: "Invalid admin key." });
    return;
  }

  next();
};

export default adminMiddleware;
