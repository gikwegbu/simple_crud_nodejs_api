import express from 'express';

import { deleteUserById, getUserById, getUsers, updateUserById } from '../db/users_db';
import { apiResponse, account_not_found, user_deleted, fetched_successfully, forbidden, user_updated } from '../utils/common_response';
import { get } from 'lodash';
import { MONGOOSE_IDENTITY_ID } from '../helpers/constants';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const user = await getUsers();
        apiResponse(res, 200,  fetched_successfully, user);
        return;
    } catch (error) {
        apiResponse(res, 400, `❌ ${error}`, null);
        console.log("Error @GetAllUsers", error);
        return;
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const id = req.params.id;
        const currentUserId = get(req, MONGOOSE_IDENTITY_ID) as string;
        if(!currentUserId) {
            apiResponse(res, 404, account_not_found, null);
            return;
        }
        await deleteUserById(req.params.id);
        apiResponse(res, 200, user_deleted, null);
        return;
    } catch (error) {
        apiResponse(res, 400, `❌ ${error}`, null);
        console.log("Error @DeleteUser", error);
        return;
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const id = req.params.id;
        const { username } = req.body;
        const currentUserId = get(req, MONGOOSE_IDENTITY_ID) as string;
        if(!currentUserId) {
            apiResponse(res, 404, account_not_found, null);
            return;
        }
        if(!username) {
            apiResponse(res, 403, forbidden, null);
            return;
        }
        // await updateUserById(id, req.body);
        const user = await getUserById(id);
        user.username = username;
        (await user).save();
        apiResponse(res, 200, user_updated, user).end();
        return;
    } catch (error) {
        apiResponse(res, 400, `❌ ${error}`, null);
        console.log("Error @UpdateUser", error);
        return;
    }
}