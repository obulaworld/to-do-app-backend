# To Do App
An application that contains a list of users and user tasks attached to each user.

## Project Structure

The project structure follows the **MVC** (Model-View-Controller) pattern.
```
├── src
│   ├── __tests__
│   │   ├── __mockData__
│   │   │   └── index.js
│   │   └── UserController.test.js
│   │   └── UserTaskController.test.js
│   ├── config
│   │   └── database.js
│   │   └── environment.js
│   ├── controllers
│   │   └── UserController
│   │   │      └── index.js
│   │   │      └── UserController.js
│   │   └── UserTaskController
│   │   │      └── index.js
│   │   │      └── UserTaskController.js
│   │   └── index.js
│   ├── helpers
│   │   └── Error.js
│   ├── index.js
│   ├── middlewares
│   │   └── UserTaskValidator.js
│   │   └── UserValidator.js
│   ├── database
│   │   └── migrations
│   │        └── 20191223131338-create-user.js
│   │        └── 20191223131908-create-user-tasks.js
│   │   └── seeders
│   │        └── userSeeder.js
│   │   └── models
│   │        └── index.js
│   │        └── user.js
│   │        └── usertasks.js
```

## Requirements

* Node.js
* npm
* PostgresDB
* Sequelize

## Getting Started

```
$ git clone https://github.com/obulaworld/to-do-app-backend.git
$ cd to-do-app-backend
$ npm install
$ npm run server                  # For development purpose
```

You should now be able to access the API via http://localhost:port/api/v1/

**NOTE:** Create a `.env` file configuration following the `.env.sample`.

## Project Details
`users:`
 - create a user
 - get all users
 - update a user
 - delete a user

 `userTasks:`
 - create a user task
 - get all user's tasks
 - update a user task
 - delete a user task

## API Endpoints

<table>
<tr><th>HTTP VERB</th><th>ENDPOINTS</th><th>DESCRIPTION</th><th>QUERY</th></tr>
<tr><td>GET</td><td>/api/v1/users</td><td>Gets all users</td><td></td></tr>
<tr><td>POST</td><td>/api/v1/users</td><td>Creates users</td><td></td></tr>
<tr><td>PUT</td><td>/api/v1/users/:userId</td><td>Updates a user</td><td></td></tr>
<tr><td>DELETE</td><td>/api/v1/users/:userId</td><td>Deletes a user</td><td></td></tr>

<tr><td>GET</td><td>/api/v1/tasks/:userId</td><td>Gets all user's tasks</td><td></td></tr>
<tr><td>POST</td><td>/api/v1/tasks</td><td>Creates user task</td><td></td></tr>
<tr><td>PUT</td><td>/api/v1/tasks/:taskId</td><td>Updates a user task</td><td></td></tr>
<tr><td>DELETE</td><td>/api/v1/tasks/:taskId</td><td>Deletes a user task</td><td></td></tr>
