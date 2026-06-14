import API from "./api.ts";

export interface Admission {
  _id: string;
  name: string;
  email: string;
  phone?: string | null;
  courseInterest?: string | null;
  qualification?: string | null;
  city?: string | null;
  created_at: string;
}

export interface AdmissionsSummary {
  total: number;
  courseCounts: Record<string, number>;
  admissions: Admission[];
}

export const getAdmissions = async (adminKey: string): Promise<AdmissionsSummary> => {
  const res = await API.get("/admin/admissions", {
    headers: { "x-admin-key": adminKey },
  });
  return res.data.data;
};
