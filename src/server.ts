import "reflect-metadata";
import express, {Request, Response, NextFunction} from "express";
import "express-async-errors";
import cors from "cors";
import { router } from "./routes";

import "./database"; //Nao e necessario colocar o index

const app = express();

app.use(cors(
    //origin: IP para utilizar apenas
));

app.use(express.json());

app.use(router);

//Utilização de middleware
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof Error) {
        return response.status(400).json({
            error: err.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
})

app.listen(3000, () => console.log("Server is running now"));