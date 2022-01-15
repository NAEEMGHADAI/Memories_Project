import axios from "axios";
const url = "http://localhost:5000/posts/";

export const fetchPosts = async () => axios.get(url);
export const createPost = async (newPost) => axios.post(url, newPost);
