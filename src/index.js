import dotenv from 'dotenv';
import { connectDB } from "../src/db/index.js";
import app from "./app.js";

dotenv.config({ path: './.env' });

connectDB()
    .then(() => {
        app.listen(process.env.PORT, (err) => {
            if (err) {
                console.log("Error while starting the server:", err);
            } else {
                console.log(`Listening At http://localhost:${process.env.PORT}`);
            }
        });

        app.on('error', (err) => {
            console.log("Caused an error!!!", err);
        });
    })
    .catch((err) => {
        console.log("Error While Initialising App:", err);
    });
