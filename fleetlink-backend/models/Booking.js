import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
  fromPincode: { type: String, required: true },
  toPincode: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  customerId: { type: String, required: true },
  isCancelled: { type: Boolean, default: false },
  customerName: { type: String, required: true },   
  customerEmail: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Booking", bookingSchema);
