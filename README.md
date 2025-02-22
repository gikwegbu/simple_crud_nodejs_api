# Simple Nodejs API with Typescript

# Description
This is a **simple Nodejs** API with Typescript. It uses Express as the web framework and Types to easily convert the installed js packages to typescript. It's functionality is simply based on the Authentification of users, Create, Read, Update and Delete a user, while using middlewares to authenticate and confirm a user has the rights to update and delete their account.

## Getting Started
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

## Env Files
in your `src/index.ts`, you would notice the  `mongoDb_username` and `mongoDb_pwd`, create an `env.ts` file in your `src/helpers/` folder, and provide the details. Also, in the same folder provide your unique `COOKIE_SECRET`.

## API Structure
This API is structured in 6 major folders.
- `controllers`: This is where all the logic of the API is placed. It's where you
- `db`: This is where all the database operations are placed.
- `helpers`: This is were the constant values and evn files are placed
- `middleware`: This is where all the middlewares are placed.
- `router`: This is where all the routings are configured.
- `utils`: This is where common api responses, and regex functions for validatations are kept.