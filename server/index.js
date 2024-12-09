import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectToMongo from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app= express();
const PORT= process.env.PORT || 9000;

app.use(express.json());
app.use(cors());

app.use("/api/auth", userRoutes);

connectToMongo().then(()=>{
    app.listen(PORT, (err)=>{
        if(err) console.log("Error is :" +err);
        else console.log(`Server running on PORT ${PORT}`);
    })
})


