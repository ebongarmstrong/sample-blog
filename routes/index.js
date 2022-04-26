// index.js
const express = require("express");
const router = express.Router()

module.exports = (app, db) => {
	const postRoute = require("./post.route");
	app.use("/api/posts", postRoute(app, db))
}
