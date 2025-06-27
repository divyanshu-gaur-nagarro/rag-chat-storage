# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /src

# Copy package.json and lockfile first
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy rest of the code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose app port
EXPOSE 3000

# Start via custom script
CMD ["sh", "./docker-entrypoint.sh"]
