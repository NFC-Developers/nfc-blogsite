# Use Node 20 LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose Next.js dev port
EXPOSE 3000

# Use environment variables from .env.local
ENV NODE_ENV=development

# Start Next.js in dev mode
CMD ["npm", "run", "dev"]
