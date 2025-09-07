# Stage 1 - Build React app
FROM node:18 as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2 - Serve with Nginx
FROM nginx:alpine

# Copy React build
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx config for SPA routing
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose container port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
