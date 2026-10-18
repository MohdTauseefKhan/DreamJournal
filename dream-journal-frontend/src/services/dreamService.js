
import api from "./api";

export const getDreams = async (search = "") => {
  const response = await api.get("/dreams", {
    params: search.trim() ? { search: search.trim() } : {},
  });
  return response.data;
};

export const createDream = async (dreamData) => {
  const response = await api.post("/dreams", dreamData);
  return response.data;
};

export const updateDream = async (dreamId, dreamData) => {
  const response = await api.put(`/dreams/${dreamId}`, dreamData);
  return response.data;
};

export const deleteDream = async (dreamId) => {
  await api.delete(`/dreams/${dreamId}`);
};
