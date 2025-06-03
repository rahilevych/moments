# 🖼️ moments 
A simplified version of Instagram built with the MERN stack and TypeScript. Users can register and login, manage their profile, liking posts and write comments in real time using WebSockets.

## 🗃️ Technologies
- React.js
- TypeScript
- Tailwind CSS
- WebSokets
- MongoDB
- Node.js
- Express.js


## 🤙 Features
There are two types of users: registered and unregistered. 
Unregistered users can only create a new account or log in to the website.

### Registered users can:

- Like posts and comments
- Add comments
- Manage their posts
- View the list of all users
- Search for users
- Subscribe/unsubscribe to other users
- View detailed information
- See all comments on post

## 📽️ The Development Process

The main goal of project was to implement layered architecture to make codebase cleaner and easier to debug.
The app is devided into two parts: client and server, each with its own structute

### Сlient

Client was built using React, Typescript and Tailwind CSS. 
The client-side is organized with protected routes to ensure that only logged-in users can access certain parts of the application. Before a user can navigate to any route, the application checks for the presence of a user and token in localStorage. If these are not found, access to other routes is restricted. This approach ensures that only authenticated users can interact with the website.

#### Сlient structure:
- components:reusable components
- context: global state management using context
- hooks: custom react hooks
- pages: page-level components 
- services: API iteraction logic
- types: TypeScript types 
- utils: utility functions
- __test__:  uni-tests using React Testing Library and Jest

### Іerver
Server was created using Node.js and Express.js

#### Server structure:
- config: configuration functions
- controllers: handle incoming requests, call services
- models: database models
- routes: API endpoints
- utils: utility functions
- middleware: middleware functions(e.g., auth,error handling)
- sockets: WebSockeet-related logic 

## 🧠 What I Learned

- first hands-on experience with WebSockets
- improved knowledge of Node.js + Express.js
- strengthened React.js skills
- gained more proficiency with TypeScript
  
## ⬆️ How Can It Be Improved?
- add real-time chat between users
- add stories feature
- impove home page with recommendations
- add saved posts feature
  
## 🎥 Demo: 
