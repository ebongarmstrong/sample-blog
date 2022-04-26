const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('./db');
const { ServerApiVersion } = require('mongodb');
const routes = require("./routes")
const {replaceText} = require("./helper")
require('dotenv').config();

// app.use(express.static("public"))
const PORT = process.env.PORT ||  8080;
const publicPath = path.join(__dirname, "public");
app.use("/static", express.static(publicPath));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME || "posts";
const dbUri =  process.env.NODE_ENV === "development"
? replaceText(`mongodb://127.0.0.1:27017/<dbName>?directConnection=true&serverSelectionTimeoutMS=2000`, new RegExp(/<dbName>/), dbName)
 : replaceText(process.env.DB_URI || "", new RegExp(/\<dbName\>/), dbName) ;

async function main () {
  try{
    console.log(dbUri)
    const db = await mongoose.connect(dbUri, {useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
    console.log("MongoDB connected!")
    routes(app, db);
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });

  }catch(err) {
    console.error(err)
  }
}
main()
