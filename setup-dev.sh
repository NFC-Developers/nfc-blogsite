#!/bin/bash

# Development setup script
echo " Setting up NFC Blogsite for development..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo " Docker is not running. Please start Docker first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo " Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Install dependencies
echo " Installing dependencies..."
npm install

# Start PostgreSQL container
echo " Starting PostgreSQL container..."
docker-compose up postgres -d

# Wait for PostgreSQL to be ready
echo " Waiting for PostgreSQL to be ready..."
sleep 10

# Run Prisma migrations
echo " Running Prisma migrations..."
npx prisma migrate dev --name init

# Generate Prisma client
echo " Generating Prisma client..."
npx prisma generate

# Seed the database
echo " Seeding database..."
npx prisma db seed

# Start Firebase emulators
echo " Starting Firebase emulators..."
docker-compose up firebase-emulators -d

echo " Development environment is ready!"
echo ""
echo " Available commands:"
echo "  npm run dev                 - Start development server"
echo "  npm run docker:dev          - Start full development environment with Docker"
echo "  npm run db:studio           - Open Prisma Studio"
echo "  npm run firebase:start      - Start Firebase emulators locally"
echo ""
echo " URLs:"
echo "  App:              http://localhost:3000"
echo "  Prisma Studio:    http://localhost:5555"
echo "  Firebase UI:      http://localhost:4000"
echo ""
