import React, { useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { getPosts } from "./actions/posts";
import memories from "../src/images/memories.png";
import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";
import useStyles from "./styles";
const App = () => {
	const classes = useStyles();
	const dispacth = useDispatch();
	useEffect(() => {
		dispacth(getPosts());
	}, [dispacth]);
	return (
		<Container maxWidth="lg">
			<AppBar className={classes.appBar} position="static" color="inherit">
				<Typography className={classes.heading} variant="h3" align="center">
					Memories
				</Typography>
				<img
					className={classes.image}
					src={memories}
					alt="memories"
					height="60"
				/>
			</AppBar>
			<Grow in>
				<Container>
					<Grid
						container
						justifyContent="space-between"
						alignItems="stretch"
						spacing={3}
					>
						<Grid item xs={12} sm={7}>
							<Posts />
						</Grid>
						<Grid item xs={12} sm={4}>
							<Form />
						</Grid>
					</Grid>
				</Container>
			</Grow>
		</Container>
	);
};
export default App;
