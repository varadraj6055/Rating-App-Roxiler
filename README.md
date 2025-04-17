# MERN Stack Store Rating App
This is the assignment submitted by Varadraj Kharosear to Roxiler  it is an full-stack web app for rating stores, built using the MERN stack (MongoDB, Express.js, React.js, Node.js). Users can register, log in, view stores, and submit ratings. Admin users can manage stores and users.

## Technologies
MongoDB: NoSQL database

Express.js: Backend API framework

React.js: Frontend UI

Node.js: Server-side runtime

Mongoose: MongoDB object modeling

Axios: HTTP client for API requests

## Features
User Registration & Authentication: Sign up, login, and submit ratings.

Store Management: Admins can add, update, and delete stores.

Ratings: Submit 1-5 ratings for stores.

Admin Dashboard: View statistics on users, stores, and ratings.

Form Validation: Ensures accurate data (email, name, address, password).

Responsive Design: Works across devices.

## Setup
Clone the Repo:
git clone https://github.com/varadraj6055/Rating-App-Roxiler.git
Install Dependencies:
Backend:
cd backend
npm install
Frontend:
cd frontend
npm install
Set Environment Variables:
Create .env file:
ini

MONGODB_CONNECTION_URI=mongodb://localhost:27017/your_db
JWT_SECRET=your_jwt_secret_key
Start the Servers:

Backend:
npm start
Frontend:

npm run dev
Prerequisites:

Node.js (v14+)

MongoDB (local or Atlas)

npm

## Validations:

Name: 20-60 characters

Address: Max 400 characters

Password: 8-16 characters, 1 uppercase, 1 special character

Email: Standard format

## Contributing
Fork the repo, make changes, and submit a pull request.
