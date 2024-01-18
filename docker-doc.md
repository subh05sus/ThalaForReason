# Using "Thala For Reason" with Docker

## Introduction

"Thala For Reason" is a Node.js-based web application. This guide provides instructions on how to run it using Docker, which simplifies setup and ensures consistency across different environments.

## Prerequisites

- Docker installed on your machine (Linux, Windows, or macOS).
- A Google API key.

## Installing Docker

### Linux

1. Update your package index:
   ```
   sudo apt-get update
   ```

2. Install Docker:
   ```
   sudo apt-get install docker-ce docker-ce-cli containerd.io
   ```

3. Verify the Docker installation:
   ```
   sudo docker run hello-world
   ```

### Windows

1. Download Docker Desktop from [Docker Hub](https://hub.docker.com/).
2. Run the installer and follow the instructions.
3. Open Docker Desktop to complete the installation.

### macOS

1. Download Docker Desktop from [Docker Hub](https://hub.docker.com/).
2. Double-click the DMG file and drag the Docker icon to the Applications folder.
3. Open Docker from the Applications folder.

## Creating a Google API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing one.
3. Navigate to "APIs & Services" > "Credentials".
4. Click "Create Credentials" and select "API key".
5. Copy the generated API key for later use.

## Running the Application with Docker

1. Clone the repository:
   ```
   git clone https://github.com/your-username/thala-for-reason.git
   ```

2. Navigate to the project directory:
   ```
   cd thala-for-reason
   ```

3. Build the Docker image:
   ```
   docker build -t thala-for-reason .
   ```

4. Run the Docker container, replacing `your_google_api_key` with your actual Google API key:
   ```
   docker run -itd -p 80:8080 -e GOOGLE_API_KEY=your_google_api_key thala-for-reason
   ```

5. Access the application at `http://localhost:80`.

## Notes

- It's important to keep your Google API key secure. Do not hardcode it in your Dockerfile or source code.
- For detailed Docker installation instructions, refer to the official Docker documentation.
