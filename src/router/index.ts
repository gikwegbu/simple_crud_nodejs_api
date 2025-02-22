import  express  from "express";
import authRouter from './auth_router'
import userRouter from './users_router'

const router = express.Router();

export default (): express.Router => {
    authRouter(router);
    userRouter(router);
    return router;
}