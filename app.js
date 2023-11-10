const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();
const signalRoutes = require("./Routes/signalRoutes")
const app = express();
app.use(express.json());
// mongoose connections.
mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("mongoose connected")
})

app.use("/app/p1",signalRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
module.exports = app
