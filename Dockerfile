# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and lockfile
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the app code
COPY . .

# Expose port
EXPOSE 3000

# Start Next.js
CMD ["npm", "run", "dev"]
