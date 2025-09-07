import React, { useState } from "react";
import { getAvailableVehicles, bookVehicle } from "../api";
import VehicleList from "../components/VehicleList";
import BookingModal from "../components/BookingModal";

const SearchBook = () => {
  const [form, setForm] = useState({
    capacityRequired: "",
    fromPincode: "",
    toPincode: "",
    startTime: ""
  });
  const [vehicles, setVehicles] = useState([]);
  const [message, setMessage] = useState("");
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null); // modal state

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSearch = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoadingSearch(true);
    try {
      const res = await getAvailableVehicles({
        capacityRequired: form.capacityRequired,
        fromPincode: form.fromPincode,
        toPincode: form.toPincode,
        startTime: form.startTime
      });
      setVehicles(Array.isArray(res.data) ? res.data : []);
      if (!res.data.length)
        setMessage("No vehicles available for given criteria.");
    } catch (err) {
      setMessage("❌ Error: " + (err.response?.data?.message || "Something went wrong"));
    } finally {
      setLoadingSearch(false);
    }
  };

  const handleBookClick = (vehicle) => {
    setSelectedVehicle(vehicle); // open modal
  };

  const handleConfirmBooking = async ({ name, email }) => {
    try {
      await bookVehicle({
        vehicleId: selectedVehicle._id,
        fromPincode: form.fromPincode,
        toPincode: form.toPincode,
        startTime: form.startTime,
        customerName: name,
        customerEmail: email
      });
      setMessage("✅ Booking successful!");
      setVehicles((prev) => prev.filter((v) => v._id !== selectedVehicle._id));
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("❌ Booking failed: " + (err.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Search & Book Vehicle</h2>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="space-y-3">
        <input
          name="capacityRequired"
          type="number"
          placeholder="Capacity Required"
          value={form.capacityRequired}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="fromPincode"
          placeholder="From Pincode"
          value={form.fromPincode}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="toPincode"
          placeholder="To Pincode"
          value={form.toPincode}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="startTime"
          type="datetime-local"
          value={form.startTime}
          onChange={handleChange}
          required
          min={new Date().toISOString().slice(0, 16)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          {loadingSearch ? "Searching..." : "Search Availability"}
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}

      <VehicleList vehicles={vehicles} onBook={handleBookClick} />

      {/* Booking Modal */}
      {selectedVehicle && (
        <BookingModal
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
          onConfirm={handleConfirmBooking}
        />
      )}
    </div>
  );
};

export default SearchBook;
