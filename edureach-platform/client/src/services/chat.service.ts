import API from "./api.ts";

export const sendMessage = async (message: string) => {
  const res = await API.post("/chat/message", { message });
  return res.data.data; // { message: "answer text" }
};
