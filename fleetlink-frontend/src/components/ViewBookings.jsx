import React, { useEffect, useState } from "react";
import { getAllBookings, cancelBooking } from "../api";

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("all"); // all | booked | cancelled

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await getAllBookings();
      setBookings(res.data);
      setMessage("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error fetching bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      const res = await cancelBooking(id);
      setMessage(res.data.message || "Cancelled");
      // update locally
      setBookings((prev) => prev.map(b => b._id === id ? { ...b, isCancelled: true } : b));
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to cancel booking");
    }
  };

  const filtered = bookings.filter(b => {
    if (filter === "all") return true;
    if (filter === "booked") return !b.isCancelled;
    if (filter === "cancelled") return b.isCancelled;
    return true;
  });

  return (
    <div className="bg-white p-6 rounded-md shadow-md max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">All Bookings</h2>

      <div className="mb-4">
        <label className="mr-2">Filter:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="p-1 border rounded">
          <option value="all">All</option>
          <option value="booked">Booked</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button onClick={fetchBookings} className="ml-4 p-1 border rounded">Refresh</button>
      </div>

      {message && <p className="mb-3">{message}</p>}
      {loading ? <p>Loading...</p> : filtered.length === 0 ? <p>No bookings found.</p> : (
        <ul className="space-y-3">
          {filtered.map(b => (
            <li key={b._id} className={`border p-3 rounded ${b.isCancelled ? "bg-red-50" : ""}`}>
              <p><strong>Vehicle:</strong> {b.vehicleId?.name || "Unknown"}</p>
              <p><strong>From:</strong> {b.fromPincode} <strong>To:</strong> {b.toPincode}</p>
              <p><strong>Start:</strong> {new Date(b.startTime).toLocaleString()}</p>
              <p><strong>End:</strong> {new Date(b.endTime).toLocaleString()}</p>
              <p><strong>Customer ID:</strong> {b.customerId}</p>
              <p><strong>Status:</strong> {b.isCancelled ? "Cancelled" : "Booked"}</p>
              {!b.isCancelled && (
                <button onClick={() => handleCancel(b._id)} className="mt-2 bg-red-600 text-white px-3 py-1 rounded">Cancel Booking</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewBookings;
