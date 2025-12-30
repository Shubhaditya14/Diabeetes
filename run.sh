#!/bin/bash

# MLOps Diabetes Prediction - Run Script
# This script starts all services for development

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=================================${NC}"
echo -e "${BLUE}  MLOps Diabetes Prediction      ${NC}"
echo -e "${BLUE}=================================${NC}"
echo ""

# Check if we're in the right directory
if [ ! -f "docker-compose.yml" ]; then
    echo -e "${RED}Error: docker-compose.yml not found. Run this script from the MLOPS directory.${NC}"
    exit 1
fi

# Function to cleanup on exit
cleanup() {
    echo ""
    echo -e "${YELLOW}Shutting down services...${NC}"

    # Kill frontend dev server if running
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null || true
    fi

    # Kill backend if running
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null || true
    fi

    echo -e "${GREEN}All services stopped.${NC}"
    exit 0
}

trap cleanup SIGINT SIGTERM

# Parse command line arguments
USE_DOCKER=false
DEV_MODE=true

while [[ $# -gt 0 ]]; do
    case $1 in
        --docker)
            USE_DOCKER=true
            shift
            ;;
        --prod)
            DEV_MODE=false
            shift
            ;;
        --help)
            echo "Usage: ./run.sh [options]"
            echo ""
            echo "Options:"
            echo "  --docker    Use Docker Compose to run all services"
            echo "  --prod      Run in production mode (build frontend)"
            echo "  --help      Show this help message"
            echo ""
            echo "Default: Runs backend and frontend in development mode"
            exit 0
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            exit 1
            ;;
    esac
done

if [ "$USE_DOCKER" = true ]; then
    echo -e "${YELLOW}Starting services with Docker Compose...${NC}"
    echo ""
    docker-compose up --build
else
    echo -e "${YELLOW}Starting services in development mode...${NC}"
    echo ""

    # Check for Python
    if ! command -v python3 &> /dev/null; then
        echo -e "${RED}Error: Python 3 is required but not installed.${NC}"
        exit 1
    fi

    # Check for Node.js
    if ! command -v node &> /dev/null; then
        echo -e "${RED}Error: Node.js is required but not installed.${NC}"
        exit 1
    fi

    # Install backend dependencies if needed
    echo -e "${BLUE}[1/4] Checking backend dependencies...${NC}"
    if [ ! -d "backend/venv" ]; then
        echo "Creating virtual environment..."
        python3 -m venv backend/venv
    fi

    # Activate and install dependencies
    if [ -f "backend/venv/bin/activate" ]; then
        source backend/venv/bin/activate
        pip install -q -r backend/requirements.txt 2>/dev/null || pip install -r backend/requirements.txt
    else
        echo -e "${RED}Error: Failed to create virtual environment${NC}"
        exit 1
    fi

    # Install frontend dependencies if needed
    echo -e "${BLUE}[2/4] Checking frontend dependencies...${NC}"
    if [ ! -d "frontend/node_modules" ]; then
        echo "Installing frontend dependencies..."
        cd frontend && npm install && cd ..
    fi

    # Start backend
    echo -e "${BLUE}[3/4] Starting backend on http://localhost:8000 ...${NC}"
    cd backend
    python3 -m uvicorn app:app --reload --host 0.0.0.0 --port 8000 &
    BACKEND_PID=$!
    cd ..

    # Wait for backend to be ready
    echo "Waiting for backend to start..."
    sleep 3

    # Start frontend
    echo -e "${BLUE}[4/4] Starting frontend on http://localhost:5173 ...${NC}"
    cd frontend
    if [ "$DEV_MODE" = true ]; then
        npm run dev &
        FRONTEND_PID=$!
    else
        npm run build
        npm run preview &
        FRONTEND_PID=$!
    fi
    cd ..

    echo ""
    echo -e "${GREEN}=================================${NC}"
    echo -e "${GREEN}  All services started!          ${NC}"
    echo -e "${GREEN}=================================${NC}"
    echo ""
    echo -e "  Frontend:  ${BLUE}http://localhost:5173${NC}"
    echo -e "  Backend:   ${BLUE}http://localhost:8000${NC}"
    echo -e "  API Docs:  ${BLUE}http://localhost:8000/docs${NC}"
    echo ""
    echo -e "${YELLOW}Press Ctrl+C to stop all services${NC}"
    echo ""

    # Wait for processes
    wait
fi
