# 🏔️ SereneScape | Full-Stack Budget-First Travel Planner

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Live Preview:** [https://serene-scape.onrender.com](https://serene-scape.onrender.com)

## 📌 Project Overview
SereneScape is a MERN-stack web application designed to help travelers plan itineraries within strict financial limits. Unlike standard travel apps, it focuses deeply on **real-time budget enforcement** and **data persistence** to ensure a seamless, mathematically accurate planning experience. 

It was built to demonstrate proficiency in handling complex relational data, dynamic state management, and full-stack deployment.

## ✨ Key Technical Features
* **Real-Time "Budget Guard":** Engineered a strict validation system that aggregates dynamic costs from selected destinations and manual expenses. The logic mathematically blocks any transaction that exceeds the user-defined trip limit.
* **Relational Data Architecture:** Developed a robust backend schema using MongoDB sub-documents and `populate()` to manage complex, multi-layered relationships between Trips, Destinations (Spots), and Daily Expenses.
* **Persistent Session Management:** Implemented a trip history dashboard with an off-canvas UI that allows users to seamlessly archive, reset, and instantly restore past planning sessions from the Atlas database.
* **Dynamic UI/UX:** Built a highly interactive dashboard using React Hooks (`useState`, `useEffect`) and Tailwind CSS, featuring real-time state updates for budget visualizations without needing page reloads.

## 🛠️ Tech Stack
* **Frontend:** React.js (Vite), Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas, Mongoose (RESTful API architecture)
* **Deployment:** Render (Static Site & Web Service)
