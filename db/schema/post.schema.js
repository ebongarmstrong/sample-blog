// post.schema.js
const mongoose = require("mongoose")

	const schema = new mongoose.Schema({
		title: String,
		subtitle: String,
		author: String,
		category: String,
		content: String
	});
module.exports = schema