# Auth

This repository contains a full-stack authentication system built using **Node.js**, providing a secure and user-friendly way to handle user registration, login, session management, and password recovery. The application uses **JWT (JSON Web Tokens)** for authentication, ensuring secure, stateless login mechanisms. Passwords are hashed with **bcrypt** for safe storage, and the app includes features to help users recover forgotten passwords.

## Features
- **User Registration**: Users can create accounts with secure passwords.
- **Login**: Login functionality using JWT for secure session management.
- **Password Recovery**: Users can request a password reset if they forget their password, with a secure reset process.
- **Password Hashing**: Passwords are hashed using **bcrypt** before storage to ensure security.
- **Responsive UI**: The frontend is responsive, providing seamless access for users across devices.
- **Session Management**: Sessions are managed through JWT, allowing users to stay logged in securely.
  
## Installation

To get started, clone the repository:
```
git clone https://github.com/Nagul71/Auth.git
```

Navigate to the project directory:
```
cd Auth
```

Install all necessary dependencies using **npm**:
```
npm install
```

## Running the Application

To run the backend server, use:
```
npm start
```

For the frontend, use:
```
npm run dev
```

Ensure your environment is set up to handle requests (e.g., database connection, API configurations).

## Forgot and Reset Password

- Users can initiate a password reset process via their email.
- A secure link will be sent to the registered email for resetting the password.
- This feature is useful for improving user experience and reducing security risks associated with password management.

## Contributing

Feel free to fork this repository, make your improvements, and send pull requests. Any contributions, bug fixes, or feature additions are welcome.

## License

This project is licensed under the **MIT License**
