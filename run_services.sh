#!/bin/bash
# Load environment variables
source ./env.sh
# Define function to kill processes on exit
trap 'cleanup'  INT

cleanup() {
  echo "Stopping microservices..."
  echo "Done."
  exit 1
}
# Set trap for SIGINT signal
trap cleanup SIGINT
# Start microservice 1
cd "$ACCOUNT_PATH"
php artisan serve --port=8000 &
# Start microservice 2
cd "$FORUM_PATH"
php artisan serve --port=8001 &
# Start microservice 3
cd "$CALENDAR_PATH"
php artisan serve --port=8002 &
# Start microservice 4
cd "$STORAGE_PATH"
php artisan serve --port=8003 &
# Start microservice 4
cd "$NOTE_PATH"
php artisan serve --port=8004 &
# Start React project
cd "$REACT_PROJECT_PATH"
npm start