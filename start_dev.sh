#!/bin/bash

# Function to kill child processes on exit
cleanup() {
    echo "Stopping servers..."
    kill $(jobs -p) 2>/dev/null
    exit
}

trap cleanup SIGINT SIGTERM

echo "Starting Backend (FastAPI)..."
cd backend
source venv/bin/activate
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!

cd ..

echo "Starting Frontend (Vite)..."
cd frontend
npm run dev -- --host &
FRONTEND_PID=$!

echo "Servers started!"
echo "Backend: http://localhost:8000/docs"
echo "Frontend: http://localhost:5173"

wait
