import { AUTH } from "../constants/actionTypes";

import * as api from "../api/index";

export const signin = (formData, navigate) => async (dispatch) => {
	try {
		//log in the user
		navigate("/");
	} catch (error) {
		console.log(error);
	}
};

export const signup = (formData, navigate) => async (dispatch) => {
	try {
		//Sign up the user
		navigate("/");
	} catch (error) {
		console.log(error);
	}
};
