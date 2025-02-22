import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';
import { mongoDb_username, mongoDb_pwd } from './helpers/env';

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log('🚀🚀 Server is running on port http://localhost:8080/');
});

// const mongoURL = "mongodb+srv://mongoDb_username:mongoDb_pwd@cluster0.zdb1y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const mongoURL = "mongodb+srv://"+mongoDb_username+":"+mongoDb_pwd+"@cluster0.zdb1y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.Promise = Promise
mongoose.connect(mongoURL);

mongoose.connection.on('error', (err: Error) => console.log(err));

app.use('/', router());