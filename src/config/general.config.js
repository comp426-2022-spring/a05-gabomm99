// Configuration goes here
const fs = require('fs')
const morgan = require('morgan')
//"Importing database script"
const db = require("../services/database.js")
//Requiring express for the whole app
const express = require('express')
const app = express()

//Export all of the above
module.exports = {
    fs: fs,
    morgan: morgan,
    db: db,
    express: express,
    app: app
};
