# 🚚 FleetLink - Logistics Vehicle Booking System

FleetLink is a **MERN stack** application for managing and booking logistics vehicles.  
It provides an easy way to **search, book, and manage vehicles** while preventing scheduling conflicts.  

---

## ✨ Tech Stack
- **Backend**: Node.js + Express + MongoDB  
- **Frontend**: React + Tailwind CSS  
- **Deployment**: Docker + Docker Compose  

---

## 📂 Project Structure




FleetLink/

 ├── fleetlink-backend/               # Express + MongoDB backend

 
 ├── fleetlink-frontend/              # React frontend

 
 ├── docker-compose.yml              # Orchestrates frontend, backend, MongoDB

 
 └── README.md

🚀 Running Locally (without Docker)

1. Clone the repo
   
    git clone https://github.com/rushikeshtaur12/FleetLink.git
  
    cd FleetLink
  
3. Backend Setup
   
     cd fleetlink-backend
   
      npm install
   
  Create a .env file inside fleetlink-backend/
  
      PORT=5000
      
      MONGO_URI=mongodb://localhost:27017/fleetlink
      
      npm run dev
      
   Backend will be available at: http://localhost:5000
   
5. Frontend Setup
   
   cd ../fleetlink-frontend
   
   npm install
   
   npm start
   
   Frontend will be available at: http://localhost:3000
   
**🐳 Running with Docker**
1. Build & Start
   
  docker-compose up --build
  
    This will start:
      Backend → http://localhost:5000
      Frontend → http://localhost:3000
      MongoDB → mongodb://mongo:27017/fleetlink
      
3. Stop Containers

  docker-compose down

**📌 API Endpoints
Vehicles

POST /api/vehicles → Add a new vehicle

GET /api/vehicles/available → Get available vehicles

Bookings
POST /api/bookings → Create booking

GET /api/manage-bookings → View all bookings

CANCEL /api/bookings/:id → Cancel booking**
 



