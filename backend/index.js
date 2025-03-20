import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from './models/bookModel.js';
import bookRoute from './routes/bookRoute.js';
const app = express();

//Middleare for parsing request body
app.use(express.json());


//Middleware for handling CORS policy
// Option 1: Allow all origins with default of cors(*)
//app.use(cors());
//Option 2: Allow custom origins
app.use(cors({
    origin:'http://localhost:3000',
    method:['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders:['Content-Type'],
}));

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome To MERN Project')
});

app.use('/books', bookRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to databse');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });