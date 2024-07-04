# Social Media Backend

This is the backend of a social media application built with Node.js and Express.js. It includes features like user authentication, posting updates, commenting, liking posts, following users, notifications, and direct messaging.

## Features

- **User Authentication**: Signup, login, and logout functionalities with JWT token-based authentication.
- **Posts**: Users can create posts, comment on posts, and like/unlike posts.
- **Follow System**: Users can follow and unfollow other users.
- **Notifications**: Users receive notifications for various activities like being followed, receiving comments, etc.
- **Direct Messaging**: Users can send and receive direct messages.
- **Profile Management**: Users can update their profile information.
- **Middleware**: Error handling and authentication middleware.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/social-media-backend.git
    cd social-media-backend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:

    ```env
    PORT=5000
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

4. Start the server:

    ```bash
    npm start
    ```

## Project Structure

```plaintext
├── controller
│   ├── authcontroller.js
│   ├── profilecontroller.js
│   ├── postcontroller.js
│   ├── followercontroller.js
│   ├── notificationcontroller.js
│   ├── directmessagecontroller.js
├── middleware
│   ├── authmiddleware.js
│   └── errorHandler.js
├── models
│   ├── usermodel.js
│   ├── postmodel.js
│   ├── notificationmodel.js
│   ├── directmessagemodel.js
├── routes
│   └── route.js
├── DB
│   └── const.js
├── .env
├── package.json
├── server.js
└── README.md


Feel free to modify the content to better suit your project's specifics and requirements.
