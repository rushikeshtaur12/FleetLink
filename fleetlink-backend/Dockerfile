# Use Node.js LTS
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files first (better cache usage)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Expose backend port
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
