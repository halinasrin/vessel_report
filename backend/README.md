# Vessel Issue Reporting System

A full-stack web app to manage vessels, crews, and report issues with vessels. Features:
- User authentication (Admin, FleetManager)
- Vessel CRUD
- Issue reporting & tracking
- Automated maintenance status updates

cd backend
npm install

# Copy env file
cp .env

# Example .env
# PORT=4000
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=
# DB_NAME=vesseldb

# Start server
npm run dev


cd frontend
npm install
cp .env.local

# Example .env
# NEXT_PUBLIC_API_URL=http://localhost:4000

# Run Next.js
npm run dev


# CURL CMD
curl -X POST http://localhost:4000/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "admin@example.com",
  "password": "Admin@123"
}'

curl -X POST http://localhost:4000/vessels \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <TOKEN>" \
-d '{
  "name": "Vessel 1",
  "imoNumber": "IMO1234567",
  "flag": "USA",
  "type": "Cargo",
  "status": "Active",
  "lastInspection": "2025-11-14"
}'

curl -X PUT http://localhost:4000/vessels/1 \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <TOKEN>" \
-d '{
  "name": "Updated Vessel 1",
  "flag": "UK",
  "type": "Cargo",
  "status": "Under Maintenance",
  "lastInspection": "2025-11-14"
}'

curl -X GET http://localhost:4000/vessels \
-H "Authorization: Bearer <TOKEN>"

curl -X GET http://localhost:4000/vessels/1 \
-H "Authorization: Bearer <TOKEN>"

curl -X POST http://localhost:4000/issues \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <TOKEN>" \
-d '{
  "category": "Engine",
  "description": "Engine overheating",
  "priority": "High",
  "vesselId": 1
}'


curl -X GET http://localhost:4000/issues/my \
-H "Authorization: Bearer <TOKEN>"
