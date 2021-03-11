import mongoose from "mongoose";
import PostMessage from "../models/postModel.js";

export const getPosts = async (req, res) => {
  //res.send("This Works");

  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(204).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  console.log("CreatePost");
  const post = req.body;
  const newPost = new PostMessage(post);

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  console.log("updatePost");
  //  http:localhost:5000/posts/123 -- 123 -id
  const { id: _id } = req.params; // _id is renaming the id to _id

  //const { post } = req.body;

  const { title, message, creator, selectedFile, tags } = req.body;

  console.log("updatePostReqBody", req.body.tags);
  console.log("updatePostReqBody createdAt", req.body.createdAt);
  console.log("updatePostReqBody creator", req.body.creator);
  console.log("updatePostReqBody message", req.body.message);

  console.log("updatePostReqBody message title", title);
  console.log("updatePostReqBody message", message);
  console.log("updatePostReqBody message", creator);

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post Available with that id");

  /* console.log("UpdatedPost", _id, post);
  const UpdatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  }); // new - true we receive an updated version of the post */

  const updatedPost = { creator, title, message, tags, selectedFile };
  await PostMessage.findByIdAndUpdate(
    _id,
    title,
    message,
    creator,
    selectedFile,
    tags,
    { new: true }
  );

  console.log("UpdatedPost", UpdatedPost.creator);
  res.json(UpdatedPost);
};
