# Use an official Node.js runtime as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json (and package-lock.json if available) into the container
COPY package*.json ./

# Install any dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Define environment variable (replace with actual key or use Docker's -e flag)
ENV GOOGLE_API_KEY="AIzaSyD-lRmBi5TVlpyJ38-Zzc-9s3-tp-1fKwY"

# Run the application
CMD ["npm", "start"]
