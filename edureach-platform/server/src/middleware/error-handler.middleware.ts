import type { Request, Response, NextFunction } from "express";

const errorHandler = (err: Error & { statusCode?: number; code?: string }, _req: Request, res: Response, _next: NextFunction): void => {
  console.error("Error:", err.message);
  res.status(err.statusCode || 500).json({
    success: false,
    code: err.code || "SERVER_ERROR",
    message: err.message || "Internal server error.",
  });
};

export default errorHandler;
