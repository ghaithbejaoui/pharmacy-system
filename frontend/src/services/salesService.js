import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Get all sales
export const getSales = () => api.get("/sales");

// Add a new sale
export const addSale = (data) => api.post("/sales", data);
