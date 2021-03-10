import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postsRoutes from "./routes/postsRoutes.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postsRoutes);

//xZKCxuK3ja2yrtZ6
//mongodb+srv://admin:<password>@mernstack.9kkyj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

//Replace <password> with the password for the admin user.
//Replace myFirstDatabase with the name of the database that connections will use by default.
//Ensure any option params are URL encoded.

const CONNECTION_URL =
  "mongodb+srv://admin:xZKCxuK3ja2yrtZ6@mernstack.9kkyj.mongodb.net/hostel?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`))
  )
  .catch((error) => console.log(console.error.message));

mongoose.set("useFindAndModify", false);
