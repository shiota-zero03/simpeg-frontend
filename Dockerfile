# Stage 1: Build Vite App
FROM node:20 AS build

WORKDIR /app

# Install dependencies and build the Vite app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve with NGINX
FROM nginx:alpine

# Copy built files from Stage 1
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: Configure NGINX settings
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 3001

CMD ["nginx", "-g", "daemon off;"]