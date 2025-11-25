import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Get all medicines
export const getMedicines = () => api.get("/medicines");

// Get one medicine by ID
export const getMedicineById = (id) => api.get(`/medicines/${id}`);

// Add a new medicine
export const addMedicine = (data) => api.post("/medicines", data);

// Update medicine by ID
export const updateMedicine = (id, data) => api.put(`/medicines/${id}`, data);

// Delete medicine by ID
export const deleteMedicine = (id) => api.delete(`/medicines/${id}`);

// Subtract 1 from stock (sell medicine)
export const sellMedicine = (id) => api.post(`/medicines/${id}/sell`);


