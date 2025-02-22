import express from 'express';
import { createUser, getUserByEmail } from '../db/users_db';
import { apiResponse } from '../utils/common_response';
import { auth, random } from '../helpers';
import { checkEmail, checkPassword } from '../utils/regex';
import { COOKIE_SECRET } from '../helpers/env';

// Register Fnc
export const register = async (req: express.Request, res: express.Response) => {
    try {
        const {email, password, username } = req.body;
        if(!email || !password || !username) {
            apiResponse(res, 400, 'Please fill in all fields', null);  
            return;
        }
        // Todo: Run a regex to confirm it's a proper email
        if(!checkEmail(email)) {
            apiResponse(res, 400, `'${email}' is not a valid email address`, null);  
            return;
        }
        // Todo: Run a regex to confirm the password has Atleast, 1 number, uppercase, lowercase, special character and 6characters long
        /*
        if(!checkPassword(password)) {
            apiResponse(res, 400, "Password must contain ****", null);  
            return;
        }
        */
        const existingUser = await getUserByEmail(email);
        if(existingUser) {
            apiResponse(res, 409, `User with '${email}' already exist`, null);
            return ;
        } 
        // Create Authentication
        const salt = random();
        const user = await createUser({email, username, auth: {
            salt,
            password: auth(salt, password),
        }});
        
        apiResponse(res, 201, "Account created successfully", user).end();
        return ;
    } catch (error) {
        // Calling the return on the apiResponse will throw : No overload matches this call in Express route handler
        apiResponse(res, 400, `❌ ${error}`, null);
        console.log("Error @register", error);
       return;
    }
        
}


// Login Fnc
export const login = async(req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            apiResponse(res, 400, 'Please fill in all fields', null);
            return;
        }
        // const user = await getUserByEmail(email);
        // NB: The .select() Specifies which document fields to include or exclude (also known as the query "projection")
        const user = await getUserByEmail(email).select("+auth.salt +auth.password");
        if(!user) {
            apiResponse(res, 404, `Account with '${email}' not found`, null);
            return;
        }
        const expectedHash = auth(user.auth.salt, password);
        if(user.auth.password != expectedHash) {
            apiResponse(res, 403, "Incorrect email or password", null);
            return;
        }
        const salt = random();
        // Adding session
        user.auth.sessionToken = auth(salt, user._id.toString());
        await user.save();

        // Adding cookie
        res.cookie(COOKIE_SECRET, user.auth.sessionToken, {
            domain: 'localhost',
            path: "/",
        });

        apiResponse(res, 200, `Login successful`, user).end();
        return;
    } catch (error) {
        apiResponse(res, 400, `❌ ${error}`, null);
        console.log("Error @Login", error);
       return;
    }
}
