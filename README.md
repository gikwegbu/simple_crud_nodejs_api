# 🚀🚀 Simple Nodejs API with Typescript

# 📝 Description
This is a **simple Nodejs** API with Typescript. It uses Express as the web framework and Types to easily convert the installed js packages to typescript. It's functionality is simply based on the Authentification of users, Create, Read, Update and Delete a user, while using middlewares to authenticate and confirm a user has the rights to update and delete their account.

## 🟢 Getting Started
To get started, you need to have Nodejs and npm installed on your machine. Then you can run the below code in your terminal 
``` javascript
$ npm install
```
This will install all the required packages in your `package.json` file.

##
    `nodemon` is being used to keep the server alive

### Spin up the server
To get the server running, then you run the below code in your terminal
``` javascript
$ npm start
```

This spins up the server at `http://localhost:8080` with `nodemone` there to rebuild at each updated instancce.

##
    To properly get your server working, you need to have an already setup `mongodb` account.

## 📁 Env Files
in your `src/index.ts`, you would notice the  `mongoDb_username` and `mongoDb_pwd`, create an `env.ts` file in your `src/helpers/` folder, and provide the details. Also, in the same folder provide your unique `COOKIE_SECRET`.

## ⛓️‍💥 API Structure
This API is structured in 6 major folders.
- `controllers`: This is where all the logic of the API is placed. It's where you
- `db`: This is where all the database operations are placed.
- `helpers`: This is were the constant values and evn files are placed
- `middleware`: This is where all the middlewares are placed.
- `router`: This is where all the routings are configured.
- `utils`: This is where common api responses, and regex functions for validatations are kept.

## 🔌 Middlewares
The middlewares are used to authenticate and authorize users. They are placed in the `middleware` folder. These includes;
- `isUserAuthenticated`: This is used to authenticate users, by using their `cookie` from the `req.cookies[COOKIE_SECRET]` to check if the user already exists. If a user exists, their details are being `merge`d, using the function from `lodash`, and the `next()` is returned, for the action to continue.

- `isOwner`: This is used to authenticate that the user taking a certain `CRUD` action is the owner of the account. Firstly, from the `req`, which by function placement, the `isUserAuthenticated` comes before the `isOwner` middle way in the route it's being called, and remember the `merging` of the `user` with our `req` in the `isUserAuthenticated`?, we can now get the data by using the `lodash` `get()` method. Please check code to understand.

## 🏗️ CRUD Operations
Below are some of the CRUD operations for the API

### 🪄 Create User
This functionality is found within the `auth_controller`, where I used the `register` function, passing the `req` & `res` from the imported `express` package.
- `Get data`: This route destructurizes the `email`, `password` and the `username` from the `req.body`, 
- `Authenticated data`: Checks if all the required values are provided, confirms the `email` passes the right `regex` test.Furthermore, checks if the user already exists,
- `Create user`: Creates a new user with the provided details and a `random()` -ly generated `salt` data.


##
    NB: Login endpoint is also here. Please read through. And their routes are controlled in the `auth_router.ts` file.

- `Creates cookie`: Lastly, for authentications, a cookie is created when users `login` using the `COOKIE_SECRET` in the `env.ts`, and the `user.auth.sessionToken`, setup in the `Mongo Schema`, is being updated with it.

### ✅ Read Users
Firstly, this section is a `route_protection` endpoint, meaning that only `authenticated` users can access it. This is where the `isUserAuthenticated` middleware comes in.

With some of the exported functions in our `users_db`, we can easily call and await the `getUsers()`, to fetch all the registered users.


### ⚠️ Update Users
To perform this action, users have to be `authenticated` and `owner` of the account. Once that is sorted, the property they want to updated is passed, and their object saved.

### ❌ <u>Delete Users</u>
To perform this action, users have to be `authenticated` and `owner` of the account. Once that is sorted, they can then delete their account using the `deleteUserById()` exported function.