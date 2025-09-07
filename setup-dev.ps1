# Development setup script for Windows
Write-Host " Setting up NFC Blogsite for development..." -ForegroundColor Green

# Check if Docker is running
try {
    docker info | Out-Null
} catch {
    Write-Host " Docker is not running. Please start Docker first." -ForegroundColor Red
    exit 1
}

# Check if Node.js is installed
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host " Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host " Installing dependencies..." -ForegroundColor Yellow
npm install

# Start PostgreSQL container
Write-Host " Starting PostgreSQL container..." -ForegroundColor Yellow
docker-compose up postgres -d

# Wait for PostgreSQL to be ready
Write-Host " Waiting for PostgreSQL to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Run Prisma migrations
Write-Host " Running Prisma migrations..." -ForegroundColor Yellow
npx prisma migrate dev --name init

# Generate Prisma client
Write-Host " Generating Prisma client..." -ForegroundColor Yellow
npx prisma generate

# Seed the database
Write-Host " Seeding database..." -ForegroundColor Yellow
npx prisma db seed

Write-Host " Development environment is ready!" -ForegroundColor Green
Write-Host ""
Write-Host " Available commands:" -ForegroundColor Cyan
Write-Host "  npm run dev                 - Start development server"
Write-Host "  npm run docker:dev          - Start full development environment with Docker"
Write-Host "  npm run db:studio           - Open Prisma Studio"
Write-Host "  npm run firebase:start      - Start Firebase emulators locally"
Write-Host ""
Write-Host " URLs:" -ForegroundColor Cyan
Write-Host "  App:              http://localhost:3000"
Write-Host "  Prisma Studio:    http://localhost:5555"
Write-Host "  Firebase UI:      http://localhost:4000"
Write-Host ""
