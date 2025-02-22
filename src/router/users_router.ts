import express from 'express';

import { deleteUser, getAllUsers, updateUser } from '../controllers/users_controller';
import { isOwner, isUserAuthenticated } from '../middlewares';

export default (router: express.Router) => {
    router.get('/users', isUserAuthenticated, getAllUsers);
    router.delete('/user/:id', isUserAuthenticated, isOwner, deleteUser);
    router.patch('/user/:id', isUserAuthenticated, isOwner, updateUser);
}