import React from "react";
import { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Grid } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";

//GET THE CURRENT ID OF THE POST TO BE UPDATED
const Form = ({ currentId, setCurrentId }) => {
	const [postData, setPostData] = useState({
		title: "",
		message: "",
		tags: "",
		selectedFile: "",
	});
	const post = useSelector((state) =>
		currentId ? state.posts.find((post) => post._id === currentId) : null
	);
	console.log(post);
	const classes = useStyles();
	const dispatch = useDispatch();
	const user = JSON.parse(localStorage.getItem("profile"));

	useEffect(() => {
		if (post) {
			setPostData({
				title: post.title,
				message: post.message,
				tags: post.tags,
				selectedFile: post.image,
			});
		}
	}, [post]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (currentId) {
			console.log("update");
			dispatch(
				updatePost(currentId, { ...postData, name: user?.result?.name })
			);
		} else {
			console.log(postData);
			dispatch(createPost({ ...postData, name: user?.result?.name }));
		}
		clear();
	};

	if (!user?.result?.name) {
		return (
			<Paper className={classes.paper}>
				<Typography variant="h6" align="center">
					Please Sign In to Create Your own Memories and like other's memories
				</Typography>
			</Paper>
		);
	}

	const clear = () => {
		setCurrentId(null);
		setPostData({
			creator: "",
			title: "",
			message: "",
			tags: "",
			selectedFile: "",
		});
	};
	return (
		<Paper className={classes.paper}>
			<form
				autoComplete="off"
				noValidate
				className={`${classes.root} ${classes.form}`}
				onSubmit={handleSubmit}
			>
				<Typography variant="h6">
					{currentId ? `Editing` : `Creating`} a Memory
				</Typography>

				<TextField
					name="title"
					variant="outlined"
					label="Title"
					fullWidth
					value={postData.title}
					onChange={(e) => setPostData({ ...postData, title: e.target.value })}
				/>
				<TextField
					name="message"
					variant="outlined"
					label="Message"
					fullWidth
					multiline
					rows={4}
					value={postData.message}
					onChange={(e) =>
						setPostData({ ...postData, message: e.target.value })
					}
				/>
				<TextField
					name="tags"
					variant="outlined"
					label="Tags"
					fullWidth
					value={postData.tags}
					onChange={(e) =>
						setPostData({ ...postData, tags: e.target.value.split(",") })
					}
				/>
				<div className={classes.fileInput}>
					<FileBase
						type="file"
						multiple={false}
						onDone={({ base64 }) =>
							setPostData({ ...postData, selectedFile: base64 })
						}
					/>
				</div>

				<Button
					className={classes.buttonSubmit}
					variant="contained"
					color="primary"
					size="large"
					type="submit"
					fullWidth
				>
					Submit
				</Button>

				<Button
					className={classes.buttonSubmit}
					variant="contained"
					color="secondary"
					size="small"
					onClick={clear}
					fullWidth
				>
					Clear
				</Button>
			</form>
		</Paper>
	);
};

export default Form;
