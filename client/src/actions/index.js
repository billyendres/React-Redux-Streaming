import streams from "../apis/streams";
import history from "../history";
import {
	SIGN_IN,
	SIGN_OUT,
	CREATE_STREAM,
	FETCH_STREAMS,
	FETCH_STREAM,
	DELETE_STREAM,
	EDIT_STREAM
} from "./types";

//Takes userId as argument and payload
//referenced from onAuthChange function in GoogleOath
export const signIn = userId => {
	return {
		type: SIGN_IN,
		payload: userId
	};
};

export const signOut = () => {
	return {
		type: SIGN_OUT
	};
};

//Creating new async POST req
export const createStream = formValues => async (dispatch, getState) => {
	const { userId } = getState().auth;
	const response = await streams.post("/streams", { ...formValues, userId });
	dispatch({ type: CREATE_STREAM, payload: response.data });

	//Using programmatic navigation to get user back to root route
	history.push("/");
};

//Creating new async GET req
export const fetchStreams = () => async dispatch => {
	const response = await streams.get("/streams");
	dispatch({ type: FETCH_STREAMS, payload: response.data });
};

//Creating new async GET req
export const fetchStream = id => async dispatch => {
	const response = await streams.get(`/streams/${id}`);
	dispatch({ type: FETCH_STREAM, payload: response.data });
};

//Creating new async PUT req
export const editStream = (id, formValues) => async dispatch => {
	const response = await streams.put(`/streams/${id}`, formValues);
	dispatch({ type: EDIT_STREAM, payload: response.data });
};

//Creating new async DELETE req
export const deleteStream = id => async dispatch => {
	await streams.delete(`/streams/${id}`);
	dispatch({ type: DELETE_STREAM, payload: id });
};
