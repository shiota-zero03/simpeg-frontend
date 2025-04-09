# Gunakan Node.js 20 sebagai base image
FROM node:20

# Set direktori kerja dalam container
WORKDIR /app

# Copy file package.json dan package-lock.json terlebih dahulu untuk caching
COPY package.json ./

# Install dependencies React
RUN npm install

# Copy semua file ke dalam container
COPY . .

# Build aplikasi React
RUN npm run build

# Install "serve" untuk menjalankan React
RUN npm install -g serve

# Expose port 3001
EXPOSE 3001

# Jalankan aplikasi React dengan serve
CMD ["serve", "-s", "build", "-l", "3001"]
