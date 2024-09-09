# Admin-Panel-API
## Links
- Deployment URL:
- Postman Public Collection/Workspace URL:
  
Create a backend API using Node.js, Express, and SQL to support an Admin Panel with the following features:
- The Admin can create projects and assign managers to them.
- Each Manager can assign employees to the projects they manage.
- Employees can view the projects assigned to them.
- Only the Admin has the ability to create new users by adding their email address and providing them with a password, which the employee or manager can use to log in.

Task Checklist:

-   Tech Stack: Node.js, Express.js, PostgreSQL, Sequelize ORM, Celebrate
-   Used an ORM to interact with my SQL database
-   Used PostgreSQL as the SQL database
-   Added route validations using celebrate 
-   Deployed the application and database on a service

## Setup .env file

```js
NODE_ENV =...
PORT =...

# JWT_Info
JWT_SECRET_KEY =...

# DB_Credentials
DB_USERNAME =...
DB_PASSWORD =...
DB_NAME =...
DB_HOST =...
```
## References

- jsonwebtoken - npm (npmjs.com): An implementation of JSON Web Tokens.
- PostgreSQL: The World's Most Advanced Open Source Relational Database
- Sequelize: Sequelize is a modern TypeScript and Node.js ORM for Oracle, Postgres, MySQL, MariaDB, SQLite and SQL Server, and more.
- 7 Best and Worst ORM for Node.js in 2023 | EverSQL
- Typescript: JavaScript with syntax for types.
- celebrate - npm (npmjs.com)

## Routes and Resources
This section outlines the expected routes in the application and specifies which roles have access to each route.

### Authentication Routes
- Signup (POST /auth/signup): Allows you to create an Admin user. There can only be one admin.
- Register User (POST /auth/register): Allows the Admin to register new users. (Only Admin can access this route.)
- Login (POST /auth/login): Allows users to log in with their credentials (username and password) and receive a JWT token for authentication.
### User Management Routes
- Create User (POST /users): Allows the Admin to create a new user.
- Get Users (GET /users): Accessible by Admin and Manager. Retrieves a list of all users.
- Get User by ID (GET /users/:id): Accessible by all users. Retrieves the details of a specific user.
- Update User (PUT /users/:id): Accessible by Admin. Updates the information of a specific user.
- Update User (PUT /users/:id): Accessible by Admin, Updates user information.
- Delete User (DELETE /users/:id):  Accessible by Admin, Soft Deletes a user.
- Permanant Delete User (DELETE /users/permanent/:id):  Accessible by Admin, Permanently Deletes a user. (OPTIONAL)
- Restore User (PATCH /users/restore/:id): Accessible by Admin, Restores a soft-deleted user.
### Role Management Routes
- Assign Role to User (POST /users/:id/assign-role): Allows the Admin to assign a role to a user.
- Revoke Role from User (POST /users/:id/revoke-role): Allows the Admin to revoke a user's role.
### Project Management Routes
- Create Project (POST /project): Accessible by Admin. Creates a new project that users can be assigned to.
- Get Projects (GET /project): Accessible by all users. Retrieves a list of projects available to the user based on their role.
- Get Project by ID (GET /project/:id): Accessible by all users. Retrieves the details of a specific project.
- Update Project (PUT /project/:id): Accessible by Admin. Updates the details of a project.
- Delete Project (DELETE /project/:id): Accessible by Admin. Soft deletes a project.
- Permanant Delete User (DELETE /project/permanent/:id):  Accessible by Admin, Permanently Deletes a project. (OPTIONAL)
- Restore Project (PATCH /project/restore/:id): Accessible by Admin. Restores a soft-deleted project.
### Audit Logs Routes
- Get Audit Logs (GET /audit-logs): Accessible by Admin. Retrieves a list of audit logs that track important actions within the system.
