// index.js

const mongoose = require("mongoose");
const postSchema = require("./schema/post.schema");


// register models
module.exports.models = {
	Post: mongoose.model("Post", postSchema)
}


module.exports = mongoose
