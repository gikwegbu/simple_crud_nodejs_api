import express from 'express';
import {  get, merge,   } from 'lodash';

import { getUserBySessionToken } from '../db/users_db';
import { account_not_found, apiResponse, forbidden, unauthorized } from '../utils/common_response';
import { COOKIE_SECRET } from '../helpers/env';
import { MONGOOSE_IDENTITY_ID } from '../helpers/constants';

export const isUserAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies[COOKIE_SECRET];
        // const authenticationToken = req.headers["authorization"]

        if(!sessionToken) {
            apiResponse(res, 403, forbidden, null);
            return ;
        }
        const existingUser = await getUserBySessionToken(sessionToken);
        if(!existingUser) {
            apiResponse(res, 401, unauthorized, null);
            return ;
        }
        // Below then adds/merges the existing user's details to the request, then calls on the next function
        merge(req, {identity:  existingUser}); 
        return next();
    } catch (error) {
        apiResponse(res, 400, `❌ ${error}`, null);
        console.log("Error @IsUserAuthenticated", error);
        return;
    }
}

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, MONGOOSE_IDENTITY_ID) as string;
        if(!currentUserId) {
            apiResponse(res, 404, account_not_found, null);
            return;
        }
        if(currentUserId.toString() !== id) {
            apiResponse(res, 401, unauthorized, null);
            return;
        }
        next();
    } catch (error) {
        apiResponse(res, 400, `❌ ${error}`, null);
        console.log("Error @IsOwner", error);
        return;
    }
}