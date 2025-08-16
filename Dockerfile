# Base image
FROM node:20-bullseye

# Install required build tools and fonts
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    curl \
    git \
    fontconfig \
    fonts-dejavu-core \
    libc6-dev \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*


# Set working directory
WORKDIR /app

# Copy package.json and lockfile
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app code
COPY . .

# Expose port
EXPOSE 3000

# Start Next.js
CMD ["npm", "run", "dev"]
