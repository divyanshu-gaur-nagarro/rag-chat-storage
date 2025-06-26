# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /src

# Copy package.json and lockfile first
COPY package*.json ./

# Install all dependencies (including dev)
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose app port
EXPOSE 3000

# Start the app using tsx (no build needed)
CMD ["npx", "tsx", "src/app.ts"]
