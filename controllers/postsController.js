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
  //  http:localhost:5000/posts/123 -- 123 -id
  const { id: _id } = req.params; // _id is renaming the id to _id

  //const { post } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post Available with that id");

  PostMessage.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        console.log("Update Error", error);
        return next(error);
      } else {
        //res.json(data);
        //res.status(200).send(data);
        const resp = PostMessage.findById(req.params.id);

        //console.log("Post updated successfully !", resp);
        //console.log("Post updated successfully !", resp.model.schema.obj);
        //res.status(200).send(resp.model.schema.obj);
        res.status(200).send(data);
      }
    }
  );

  res.json(UpdatedPost);
};

export const deletePost = async (req, res) => {
  console.log("deletePost");
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post Available with that id");

  await PostMessage.findByIdAndRemove(id);
  res.json({ message: "Deleted Successfuly" });
};

export const likePost = async (req, res) => {
  console.log("likePost");
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post Available with that id");

  const postLikes = await PostMessage.findById(id);
  console.log("postLikes", postLikes.likeCount);
  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { likeCount: postLikes.likeCount + 1 },
    { new: true }
  );
  res.json(updatedPost);
};
