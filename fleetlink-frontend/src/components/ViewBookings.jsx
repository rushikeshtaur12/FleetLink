import React, { useEffect, useState, useCallback } from "react";
import { getAllBookings, cancelBooking } from "../api";

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("all"); // all | booked | cancelled

  // pagination state
  const [page, setPage] = useState(1);
  const [limit] = useState(4); // ✅ fixed to 4 per page
  const [totalPages, setTotalPages] = useState(1);

  // ✅ useCallback makes fetchBookings stable (no eslint warning)
 const fetchBookings = useCallback(async () => {
  setLoading(true);
  try {
    const res = await getAllBookings({ page, limit, filter }); // ✅ include filter
    setBookings(res.data.bookings || []);
    setTotalPages(res.data.pagination?.totalPages || 1);
    setMessage("");
  } catch (err) {
    setMessage(err.response?.data?.message || "Error fetching bookings");
  } finally {
    setLoading(false);
  }
}, [page, limit, filter]); // ✅ add filter here


  // ✅ useEffect now safely depends on fetchBookings
  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      const res = await cancelBooking(id);
      setMessage(res.data.message || "Cancelled");
      // update locally
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, isCancelled: true } : b))
      );
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to cancel booking");
    }
  };

  const filtered = bookings.filter((b) => {
    if (filter === "all") return true;
    if (filter === "booked") return !b.isCancelled;
    if (filter === "cancelled") return b.isCancelled;
    return true;
  });

  return (
    <div className="bg-white p-6 rounded-md shadow-md max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">All Bookings</h2>

      {/* Filter + Refresh */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <label className="mr-2 font-medium">Filter:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="all">All</option>
            <option value="booked">Booked</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <button
          onClick={fetchBookings}
          className="px-3 py-2 border rounded bg-gray-100 hover:bg-gray-200"
        >
          Refresh
        </button>
      </div>

      {message && <p className="mb-3 text-blue-600">{message}</p>}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center">No bookings found.</p>
      ) : (
        <>
          {/* Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((b) => (
              <div
                key={b._id}
                className={`p-5 rounded-xl shadow-md border transition hover:shadow-lg ${
                  b.isCancelled ? "bg-red-50 border-red-300" : "bg-white"
                }`}
              >
                <h3 className="text-lg font-semibold mb-2">
                  {b.vehicleId?.name || "Unknown Vehicle"}
                </h3>
                 <p className="text-sm text-gray-600 mb-1">
                  <strong>Customer ID:</strong> {b.customerId}
                </p>
                 <p className="text-sm text-gray-600 mb-1">
                  <strong>Customer Name:</strong> {b.customerName}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Customer email:</strong> {b.customerEmail}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>From:</strong> {b.fromPincode} |{" "}
                  <strong>To:</strong> {b.toPincode}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Start:</strong>{" "}
                  {new Date(b.startTime).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>End:</strong> {new Date(b.endTime).toLocaleString()}
                </p>
               
                <p className="text-sm mb-2">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`${
                      b.isCancelled
                        ? "text-red-600 font-bold"
                        : "text-green-600 font-bold"
                    }`}
                  >
                    {b.isCancelled ? "Cancelled" : "Booked"}
                  </span>
                </p>
                {!b.isCancelled && (
                  <button
                    onClick={() => handleCancel(b._id)}
                    className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className={`px-4 py-2 border rounded ${
                page === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Prev
            </button>
            <span className="font-medium">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className={`px-4 py-2 border rounded ${
                page === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewBookings;
