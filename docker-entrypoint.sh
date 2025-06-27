#!/bin/sh

# Wait for the database to be ready
echo "Waiting for the database to be ready..."
until nc -z db 5432; do
  sleep 1
done

echo "Database is up!"

# Generate Prisma client
npx prisma generate

# (Optional) Run migrations
# npx prisma migrate deploy

# Start your app
npx tsx src/app.ts

