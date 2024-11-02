import express , {Express , Request , Response}from "express" 
import tripRouter from "./routes/trip.route";
import errorMiddleware from "./middlewares/err.middleware";

const port = 5000;

const app : Express = express();

app.use(express.json());


app.use('/', tripRouter)

app.use(errorMiddleware)

app.listen(port , () => {
    console.log("listen on port " + port);
})