# VidSwift

VidSwift is a powerful video downloading application designed with a sleek and intuitive user interface. This project is built using a full-stack architecture, leveraging Node.js and Express for the backend, while the frontend is crafted with React & styled using TailwindCSS.

## 🌟 Key Features
- **User-Friendly Interface:** Built with React to provide a seamless and responsive user experience.
- **Backend API:** Powered by Node.js and Express for handling authentication, sessions, and data storage.
- **Dark Mode:** Easily switch between light and dark modes for a personalized experience.
- **Concurrent Development:** Utilize concurrently to run both the frontend and backend servers simultaneously during development.

## 🛠️ Tech Stack

**Frontend:**
- React
- TailwindCSS
- React Router
- Styled Components
- Font Awesome Icons

**Backend:**
- Node.js
- Express
- MongoDB (via Mongoose)
- JWT (JSON Web Tokens) for authentication
- bcrypt for password hashing
- Express-session for session management
- Nodemailer for email handling

## ⚙️ Prerequisites

Make sure you have the following software installed before running this project:
- Node.js (v16.x.x or higher)
- npm (v7.x.x or higher)

## 🚀 Getting Started

1. Clone the repository: `git clone https://github.com/username/VidSwift.git` and navigate to the project directory `cd VidSwift`.
   
2. Install dependencies for the root, backend, and frontend directories:
   - At the root: `npm install`
   - In the backend directory: `cd backend && npm install`
   - In the frontend directory: `cd frontend && npm install`

3. To run the application, start both frontend and backend servers simultaneously from the root directory: `npm start`.
   - The frontend will run on `http://localhost:3000`
   - The backend will run on `http://localhost:5000`

4. Alternatively, you can run the frontend or backend individually:
   - To run the backend only: `npm run backend`
   - To run the frontend only: `npm run frontend`

## 🔧 Tools Used
- **Concurrently:** To manage multiple servers simultaneously.
- **dotenv:** For environment variable management.
- **Nodemailer:** To send emails from the backend.

## 🤝 Contribution Guidelines

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push to the branch.
5. Open a Pull Request.

## 📜 License
This project is licensed under the ISC License.
