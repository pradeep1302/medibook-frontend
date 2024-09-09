# MediBook - Frontend

MediBook is a MERN stack web application for managing patient appointments and medical prescriptions. This repository contains the React.js frontend, providing users with a responsive and intuitive interface for interacting with the backend services.

## Features

- *Appointment Management*: Book, view, and manage appointments with healthcare providers.
- *Prescription Viewing*: Access medical prescriptions and details.
- *User Profile Management*: Manage personal details and medical history.
- *Integration with RESTful API*: Communicates with a backend API for handling data.

## Technologies Used

- *React.js*: Frontend library for building user interfaces and managing state.
- *Axios*: For making HTTP requests to the backend API.
- *React Router*: For managing navigation in the application.
- *CSS/Bootstrap*: For responsive design and styling.

## Installation

1. Clone the repository:
  ```
   bash
   git clone https://github.com/pradeep1302/medibook-frontend.git
   ```

2. Navigate to the project directory:
  ```
   bash
   cd medibook-frontend
   ```

3. Install dependencies:
  ```
   bash
   npm install
   ```

4. Set up environment variables:

   - Create a .env file in the root directory and add your backend API URL:
    ```
     bash
     REACT_APP_API_URL=https://medibook-app-api.onrender.com
     ```

5. Run the app:
  ```
   bash
   npm start
   ```

6. Access the application at http://localhost:3000.

## Backend Server

The backend server, which handles user authentication, appointments, and prescription data, is located in a separate repository. You can find it here: [MediBook Backend Repository](https://github.com/pradeep1302/mern-task-app-backend.git).

Make sure to clone and run the backend server following the instructions in that repository.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for new features or bug fixes.
