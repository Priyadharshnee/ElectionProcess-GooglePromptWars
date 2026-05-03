# Step 1: Build the React frontend
FROM node:20 AS build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Step 2: Set up the Python backend
FROM python:3.10-slim
WORKDIR /app/backend

# Install Python dependencies
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code
COPY backend/ ./

# Copy the built React app from the build stage
COPY --from=build /app/frontend/dist /app/frontend/dist

# Expose the port Cloud Run expects
ENV PORT=8080
EXPOSE 8080

# Run the Flask app using Gunicorn
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 app:app
