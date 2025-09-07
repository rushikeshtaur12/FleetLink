import Booking from "../models/Booking.js";

// getting all bookings with pagination
// GET /api/manage-bookings?page=1&limit=4&filter=booked
export const getAllBookings = async (req, res) => {
  try {
    const { page = 1, limit = 10, filter = "all" } = req.query;
    const query = {};

    if (filter === "booked") {
      query.isCancelled = false;
    } else if (filter === "cancelled") {
      query.isCancelled = true;
    }

    const total = await Booking.countDocuments(query);
    const bookings = await Booking.find(query)
      .populate("vehicleId")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      bookings,
      pagination: {
        total,
        page: Number(page),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// cancel booking
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.isCancelled) {
      return res.status(400).json({ message: "Booking already cancelled", booking });
    }

    booking.isCancelled = true;
    await booking.save();

    res.status(200).json({ message: "Booking cancelled successfully", booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
