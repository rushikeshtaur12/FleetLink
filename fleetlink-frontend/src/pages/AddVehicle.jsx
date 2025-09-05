import React, { useState } from "react";
import { addVehicle } from "../api";

export default function AddVehicle() {
  const [form, setForm] = useState({ name: "", capacityKg: "", tyres: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await addVehicle({ name: form.name, capacityKg: Number(form.capacityKg), tyres: Number(form.tyres) });
      setMessage("✅ Vehicle added successfully.");
      setForm({ name: "", capacityKg: "", tyres: "" });
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || "Failed to add vehicle"));
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add Vehicle</h2>
      {message && <p className="mb-3">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="capacityKg" type="number" placeholder="Capacity (Kg)" value={form.capacityKg} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="tyres" type="number" placeholder="Tyres" value={form.tyres} onChange={handleChange} required className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Add Vehicle</button>
      </form>
    </div>
  );
}
