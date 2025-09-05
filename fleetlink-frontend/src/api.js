import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Vehicles
export const addVehicle = (data) => API.post("/vehicles", data);
export const getAvailableVehicles = (params) => API.get("/vehicles/available", { params });

// Bookings
export const bookVehicle = (data) => API.post("/bookings", data);

// Manage bookings
export const getAllBookings = () => API.get("/manage-bookings");
export const cancelBooking = (id) => API.patch(`/manage-bookings/${id}/cancel`);

export default API;
