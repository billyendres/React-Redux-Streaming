import { combineReducers } from "redux";
//Renamed reducer as formReducer to prevent naming confusion
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import streamReducer from "./streamReducer";

export default combineReducers({
	auth: authReducer,
	form: formReducer,
	streams: streamReducer
});
