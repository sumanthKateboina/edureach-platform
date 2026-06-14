import API from "./api.ts";

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  courseInterest?: string;
  qualification?: string;
  city?: string;
}) => {
  const res = await API.post("/auth/register", data);
  return res.data.data; // { token, user }
};

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await API.post("/auth/login", data);
  return res.data.data; // { token, user }
};

export const getMe = async () => {
  const res = await API.get("/auth/me");
  return res.data.data; // { user }
};
