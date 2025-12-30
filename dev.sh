#!/bin/bash

# Quick dev script - starts backend and frontend

trap 'kill $(jobs -p) 2>/dev/null' EXIT

echo "Starting Backend on :8000..."
cd backend && python3 -m uvicorn app:app --reload --port 8000 &

echo "Starting Frontend on :5173..."
cd frontend && npm run dev &

echo ""
echo "Services running:"
echo "  Frontend: http://localhost:5173"
echo "  Backend:  http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop"

wait
