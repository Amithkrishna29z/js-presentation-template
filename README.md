# Presentation App

his project is designed to convert data from a form into presentation slides. This README provides detailed instructions on how to set up and run the application, covering both the frontend (React) and backend (Node.js, MongoDB) components.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or above)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) (v4.4 or above)
- [React](v18.0 or above)

## Getting Started

### 1. Clone the Repository

First, clone the repository to your local machine:


## Running the Application

Run MongoDB
Before running the React application, ensure MongoDB is up and running:

Start MongoDB:

If MongoDB is installed as a service, you can start it with:

mongod

Run the Backend Server
After ensuring MongoDB is running, start the backend server:

Navigate to the Backend Directory:

Change into the backend directory:

b
cd backend
Install Backend Dependencies:

If you haven't already installed the required dependencies, do so with:

npm install
Start the Backend Server:

After installing the dependencies, start the server:


node server.js

The backend server will start and listen for requests. Ensure it is running by checking the console output.

3. Run the Frontend Application
Once the backend server is running, proceed with starting the React application:

Navigate to the Frontend Directory:

Change into the frontend directory:


cd ../frontend
Install Frontend Dependencies:

If you haven't already installed the required dependencies, do so with:


npm install
Start the React Application:

After installing the dependencies, start the application:

npm start
This will start the React development server, and you can view the application by navigating to http://localhost:3000 in your web browse

