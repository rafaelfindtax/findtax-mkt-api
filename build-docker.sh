#!/bin/bash

# Set variables
IMAGE_NAME="findtax-mkt-api"
IMAGE_TAG="latest"

# Build the Docker image
echo "Building Docker image: $IMAGE_NAME:$IMAGE_TAG"
docker build -t $IMAGE_NAME:$IMAGE_TAG .

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Docker image built successfully!"
    echo "To run the container, use:"
    echo "docker run -p 3000:3000 --env-file .env $IMAGE_NAME:$IMAGE_TAG"
else
    echo "Docker image build failed!"
fi 