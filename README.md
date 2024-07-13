# Assessment Portal

Welcome to the Assessment Portal! This project is a web-based application that allows users to browse, select, purchase, and take assessments. It is built using Angular for the front end and Node.js for the backend, with MongoDB as the database.

## Table of Contents

1. [Overview](#overview)
2. [Technologies Used](#technologies-used)
3. [Server (Backend)](#server-backend)
4. [Client (Frontend)](#client-frontend)
5. [Database](#database)
6. [Installation Instructions](#installation-instructions)
7. [Running the Repository](#running-the-repository)

## Overview

The Assessment Portal is designed to provide a seamless experience for users to manage their assessments. Key features include:

- Browsing available assessments
- Selecting and purchasing assessments
- Taking assessments online
- Viewing results and performance analytics

## Technologies Used

### Server (Backend)
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A minimal and flexible Node.js web application framework.
- **JWT**: For user authentication and authorization.

### Client (Frontend)
- **Angular**: A platform for building mobile and desktop web applications.

### Database
- **MongoDB**: A NoSQL database for storing user data, assessments, and results.

## Server (Backend)

The backend of this project is built using Node.js and Express. It provides RESTful APIs for the frontend to interact with. Key functionalities include user authentication, assessment management, and result processing.

### Key Features
- User Authentication (Login, Registration, JWT-based Authentication)
- Assessment CRUD operations
- Purchase and Order Management
- Result Storage and Retrieval

### Installation

1. Navigate to the `server` directory:
    ```bash
    cd server
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the `server` directory with the following contents:
    ```
    PORT=3000
    DB_URI=mongodb://localhost:27017/assessment-portal
    JWT_SECRET=your_jwt_secret
    ```

4. Start the server:
    ```bash
    npm start
    ```

## Client (Frontend)

The frontend of this project is built using Angular. It provides a responsive user interface for users to interact with the application.

### Key Features
- User Authentication (Login, Registration)
- Browsing and Searching Assessments
- Taking Assessments
- Viewing Results and Analytics

### Installation

1. Navigate to the `client` directory:
    ```bash
    cd client
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Start the Angular development server:
    ```bash
    ng serve
    ```

4. Open your browser and navigate to `http://localhost:4200`.

## Database

The database used for this project is MongoDB. It stores user information, assessments, and results. Ensure MongoDB is running locally or provide the URI to a remote MongoDB instance in the `.env` file in the server directory.

### Database Setup

1. Ensure MongoDB is installed and running on your local machine or a remote server.
2. Use the following URI format in your `.env` file for a local MongoDB instance:
    ```
    DB_URI=mongodb://localhost:27017/assessment-portal
    ```

## Installation Instructions

To get the application running on your local machine, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/pateldivyam26/MELENTO.git
    ```

2. Follow the installation steps for both the [Server](#server-backend) and the [Client](#client-frontend).

## Running the Repository

1. Start the backend server:
    ```bash
    cd server
    nodeomn node server.js
    ```

2. Start the frontend development server:
    ```bash
    cd client
    ng serve
    ```

3. Open your browser and navigate to `http://localhost:4200` to access the application.

