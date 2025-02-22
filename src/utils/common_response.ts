import express from 'express';

export const apiResponse = <T>(res: express.Response, statusCode: number, msg: String, data: T) => {
    return res.status(statusCode).json({
        statusCode: statusCode,
        data: data,
        message: msg,
    });
    // .end();
}

export const account_not_found = "Account not found";
export const user_deleted = 'User Deleted Successfully';
export const user_updated = 'User Updated Successfully';
export const fetched_successfully = 'Fetched Successfully';
export const unauthorized = 'UnAuthorized';
export const forbidden = 'Forbidden';