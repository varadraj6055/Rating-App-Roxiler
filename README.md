


# MERN Stack Store Rating App
The MERN Stack Store Rating App allows users to sign up, log in, view stores, and submit ratings. Admin users can manage stores and users. The app is built using the MERN stack (MongoDB, Express.js, React.js, Node.js), with authentication managed via JWT tokens 
# MERN Stack Store Rating App deployed At:
[store-rating-app](https://polite-bunny-6c78c3.netlify.app/)



## Technologies Used

- **MongoDB**: NoSQL database used for storing user registration data.
- **Express.js**: Node.js framework used for building the backend RESTful API.
- **React**: JavaScript library used for building the frontend user interface.
- **Node.js**: JavaScript runtime used for server-side development.
- **Mongoose**: MongoDB object modeling tool used for interacting with the MongoDB database.
- **Axios**: Promise-based HTTP client used for making AJAX requests from React to the backend API.

## Features

- **User Registration**: Normal users can sign up, log in, and view stores and Admin users can add other users and stores.
- **User Authentication**: Secure user authentication using Passport.js or JSON Web Tokens (JWT).
- **Operations**: Normal users can view store listings and submit ratings and Admin users can add, update, and delete stores.
- **Flash Messages**: Displaying flash messages to provide feedback to users after successful or failed operations.
- **Form Validation**: Client-side and server-side form validation to ensure data integrity and security.
- **Responsive Design**: Responsive user interface that works seamlessly across various devices and screen sizes.
- **Admin Dashboard**:Admin users can view total users, total stores, and total ratings submitted

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   https://github.com/HarshLambe/store_rate_app.git
   ```

2. **Install Dependencies**:
   - Install backend dependencies:
     ```bash
     cd backend
     npm install
     ```
   - Install frontend dependencies:
     ```bash
     cd frontend
     npm install
     ```

3. ## Set Environment Variables**:
   - Create a `.env` file in the root directory:
     ```
     MONGODB_CONNECTION_URI=mongodb://localhost:27017/your_db # Change this to your MongoDB URI
     JWT_SECRET=your_jwt_secret_key
     ```

4. ## Start the Development Server:
   - Run the backend:
     ```bash
     npm start
     ```
   - Run the frontend:
     ```bash
     npm run dev
     ```
   - The app will be accessible at `http://localhost:5173/`.
5. ## Prerequisites:
    - Node.js installed (v14 or later recommended).
    - MongoDB installed locally or a MongoDB Atlas account.
    - npm installed.
6. ## Validations:
    - The name length should be 60 characters max and 20 characters min.
   - The Address length should be 400 characters max.
    - The password length max 16 and 8 min, it should have at least 1  upper, and 1 special character in it.
    - Email address validation should be there in the email field.
   
## Contributing

Contributions are welcome! Please feel free to fork the repository, make changes, and submit a pull request.



