@echo off

:: Set variables
set IMAGE_NAME=findtax-mkt-api
set IMAGE_TAG=latest

:: Build the Docker image
echo Building Docker image: %IMAGE_NAME%:%IMAGE_TAG%
docker build -t %IMAGE_NAME%:%IMAGE_TAG% .

:: Check if build was successful
if %ERRORLEVEL% EQU 0 (
    echo Docker image built successfully!
    echo To run the container, use:
    echo docker run -p 3000:3000 --env-file .env %IMAGE_NAME%:%IMAGE_TAG%
) else (
    echo Docker image build failed!
) 