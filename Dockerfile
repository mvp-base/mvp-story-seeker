FROM node:18

WORKDIR /usr/src/app

# Install only production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy the source code
COPY . .

# Build the app
RUN npm run build

# Expose the production port
EXPOSE 3000

# Run Next.js in production mode
CMD ["npm", "run", "start"]