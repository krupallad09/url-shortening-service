import express from "express";
import urlRoute  from './routes/url.js';
import { connectToMongoDB } from './connect.js';

const app = express();
const port = 8001;

connectToMongoDB('mongodb://localhost:27017/short-url')
.then(() => {
    console.log(`Mongodb connected`)
})

app.use(express.json());
app.use('/url', urlRoute);
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})