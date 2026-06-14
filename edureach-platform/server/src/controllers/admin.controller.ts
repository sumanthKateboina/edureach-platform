import type { Request, Response, NextFunction } from "express";
import User from "../models/user.model.ts";

export const listAdmissions = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const admissions = await User.find({ courseInterest: { $exists: true, $ne: null } })
      .select("name email phone courseInterest qualification city created_at")
      .sort({ created_at: -1 })
      .lean();

    const courseCounts = admissions.reduce<Record<string, number>>((counts, admission) => {
      const course = admission.courseInterest || "Not specified";
      counts[course] = (counts[course] || 0) + 1;
      return counts;
    }, {});

    res.status(200).json({
      success: true,
      data: {
        total: admissions.length,
        courseCounts,
        admissions,
      },
    });
  } catch (error) {
    next(error);
  }
};
