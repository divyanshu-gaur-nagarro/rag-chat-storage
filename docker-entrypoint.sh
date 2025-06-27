#!/bin/sh

echo "Database is up!"
echo "Running Prisma migrations..."
npx prisma migrate deploy
npx prisma migrate dev --name init

echo "Starting the backend..."
npm run start

