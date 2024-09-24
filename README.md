# 🖼️ instclone (constantly updated)
A simplified version of Instagram built with the MERN stack and TypeScript. The main goal of this project was to gain new knowledge in Express.js, Node.js, and MongoDB. This website is my first full-stack web application using Express.js and Node.js. 

## 🗃️ Technologies
- React.js
- TypeScript
- Tailwind CSS
- Context API
- MongoDB
- Node.js
- Express.js


## 🤙 Features
There are two types of users: registered and unregistered. Unregistered users can only create a new account or log in to the website.

### Registered users can:

- Manage liked posts: add or remove posts from their liked list
- Add/delete comments: share reviews and feedback on posts
- Manage their posts: add or delete posts
- View the list of all users in the database
- Search for users
- Subscribe/unsubscribe to/from users
- View detailed information about posts
- View the list of all comments

## 📽️ The Development Process

The development process can be divided into two parts: preparation and practical work. Since this was my first project using the MERN stack, it took some additional time to read the documentation about organizing the backend and handling communication between the server and client.

The application is divided into two parts: the client and the server. The root folder for the server part of the app is server. This folder contains:

- config: Configuration functions
- controllers: Functions for specific routes
- models: Database models
- routes: Route definitions
- utils: Additional functions
- middleware: Middleware functions
- The main goal of this folder organization is to create a clear structure to avoid future issues. Additionally, dividing the code into smaller files helps make it more organized and understandable. I also made an effort to follow the Single Responsibility Principle (SRP) during the development of this website.

The server is created using Node.js and Express.js. For more details, you can explore the code directly in the repository.

Let's move to client part.

- components: Contains reusable React components for building UI elements.
- pages: Includes components representing different application views or routes.
- types: Defines TypeScript types and interfaces for type safety.
- utils: Holds utility functions and helper modules used across the app.
- assets: Stores static assets like images, fonts, and stylesheets.
- context: Manages global state and context providers for state management.

The client-side is organized with protected routes to ensure that only logged-in users can access certain parts of the application. Before a user can navigate to any route, the application checks for the presence of a user and token in localStorage. If these are not found, access to other routes is restricted. This approach ensures that only authenticated users can interact with the website.


## 🧠 What I Learned

- Node.js + Express.js
- MongoDB
- Enhanced React.js skills
- Improved understanding of Context API
- Gained more proficiency with TypeScript
  
## ⬆️ How Can It Be Improved?
- Add chat
- Add history
- Impove Home page with recommendations
- 
## 🎥 Demo: https://instclone-client.vercel.app/
