import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import AddVehicle from "./pages/AddVehicle";
import SearchBook from "./pages/SearchBook";
import ViewBookings from "./components/ViewBookings";

function App() {
  return (
    <Router>
      <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">FleetLink</h1>
          <div className="space-x-6">
            <NavLink to="/" end className={({isActive}) => isActive ? "font-semibold" : ""}>Add Vehicle</NavLink>
            <NavLink to="/search" className={({isActive}) => isActive ? "font-semibold" : ""}>Search & Book</NavLink>
            <NavLink to="/view-bookings" className={({isActive}) => isActive ? "font-semibold" : ""}>View Bookings</NavLink>
          </div>
        </div>
      </nav>

      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<AddVehicle />} />
            <Route path="/search" element={<SearchBook />} />
            <Route path="/view-bookings" element={<ViewBookings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
