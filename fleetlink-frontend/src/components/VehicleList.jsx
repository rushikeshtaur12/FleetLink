import React from "react";

const VehicleList = ({ vehicles = [], onBook }) => {
  // If vehicles is not array, normalize it
  if (!Array.isArray(vehicles)) {
    return <p className="mt-4 text-red-600">⚠️ Invalid vehicles data</p>;
  }

  // if (vehicles.length === 0) {
  //   return <p className="mt-4 text-gray-600">No vehicles available</p>;
  // }

  return (
    <div className="mt-6 space-y-4">
      {vehicles.map((v) => (
        <div
          key={v._id}
          className="border rounded-md p-4 shadow-sm flex items-center justify-between bg-gray-50"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {v.name || "Unnamed Vehicle"}
            </h3>
            <p className="text-sm text-gray-600">
              Capacity: {v.capacityKg} kg
            </p>
            {v.estimatedRideDurationHours && (
              <p className="text-xs text-gray-500">
                Est. Duration: {v.estimatedRideDurationHours} hrs
              </p>
            )}
          </div>

          <button
            onClick={() => onBook(v._id)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Book
          </button>
        </div>
      ))}
    </div>
  );
};

export default VehicleList;
