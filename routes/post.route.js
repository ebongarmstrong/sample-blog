// post.route.js
const express = require("express");
const router = express.Router()
const {model} = require("../db");

module.exports = (app, db) => {
	const Post = db.models.Post;

	router.get("/", async (req, res) => {
		try{
			const posts = await Post.find({});
			console.log({posts})
			res.status(200).json(posts)
		}catch(error){
			console.error(error);
			res.status(404).json(error)
		}
	});

	router.get("/:id", async (req, res) => {
		try{
			const {id} = req.params;
			const posts = await Post.findOne({_id: id});
			res.status(200).json(posts)
		}catch(error){
			console.error(error);
			res.status(404).json(error)
		}
	});

	router.post("/", async (req, res) => {
		try{
			if(Object.keys(req.body).length ){
				const {title, subtitle, author, category = null, content} = req.body;
				const newRecord = new Post({
					title,
					subtitle,
					author,
					category,
					content,
				})
				const data = await newRecord.save();
				res.status(201).json({message: "Post created successfully", success: true, data})
			}else{
				throw new Error("Invalid request body")
			}
			
		}catch(error){
			console.error(error);
			res.status(500).json({error: error.message, success: false})
		}
	});

	router.put("/:id", async (req, res) => {
		try{

			if(req.params.id ){
				const data = await Post.updateOne({_id: req.params.id}, req.body, {upsert: false} );
				res.status(201).json({message: "Post updated successfully", success: true, data})
			}
			throw new Error("No ID found. Invalid request")
		}catch(error){
			console.error(error);
			res.status(500).json({error: error.message, success: false})
		}
	});

	router.delete("/:id", async (req, res) => {
		try{
			if(req.params.id ){
				const data = await Post.deleteOne({_id: req.params.id});
				res.status(200).json({message: "Post deleted successfully", success: true, data})
			}
			throw new Error("No ID found. Invalid request")
		}catch(error){
			console.error(error);
			res.status(500).json({error: error.message, success: false})
		}
	});

	return router
}