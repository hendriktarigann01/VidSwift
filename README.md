VidSwift
VidSwift is a powerful video downloading application designed with a sleek and intuitive user interface. This project is built using a full-stack architecture, leveraging Node.js and Express for the backend, while the frontend is crafted with React and styled using TailwindCSS.

🌟 Key Features
User-Friendly Interface: Built with React to provide a seamless and responsive user experience.
Backend API: Powered by Node.js and Express for handling authentication, sessions, and data storage.
Dark Mode: Easily switch between light and dark modes for a personalized experience.
Concurrent Development: Utilize concurrently to run both the frontend and backend servers simultaneously during development.

🛠️ Tech Stack
Frontend:
React
TailwindCSS
React Router
Styled Components
Font Awesome Icons
Backend:
Node.js
Express
MongoDB (via Mongoose)
JWT (JSON Web Tokens) for authentication
bcrypt for password hashing
Express-session for session management
Nodemailer for email handling

⚙️ Prerequisites
Ensure you have the following software installed before running this project:
Node.js (v16.x.x or later)
npm (v7.x.x or later)

🚀 Getting Started
Follow these steps to set up and run the project on your local machine:
1. Clone the Repository:
git clone https://github.com/username/VidSwift.git
cd VidSwift

2. Install Dependencies:
For the root, backend, and frontend:
npm install
cd backend && npm install
Open a new terminal for the frontend installation:
cd frontend && npm install

3. Running the Application:
In the project root directory, start both the frontend and backend concurrently:
npm start
The frontend will run at http://localhost:3000
The backend will run at http://localhost:5000

4. Running Separately:
You can also run the frontend or backend individually:

To run the backend only:
npm run backend

To run the frontend only:
npm run frontend

🔧 Tools Used
Concurrently: To manage multiple servers simultaneously.
dotenv: For environment variable management.
Nodemailer: To send emails from the backend.

🤝 Contribution Guidelines
Contributions are welcome! Follow these steps to contribute:
1. Fork the repository.
2. Create your feature branch:
git checkout -b <feature-branch>
3. Commit your changes:
git commit -m "Add your message"
4. Push the branch:
git push origin <feature-branch>
5. Open a Pull Request.

📜 License
This project is licensed under the ISC License.