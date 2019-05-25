import { SIGN_IN, SIGN_OUT } from "../actions/types";

const INITIAL_STATE = {
	isSignedIn: null,
	userId: null
};

//userId taken from GoogleOauth onAuthChange unique id property
//Passed to action payload and then updated as state changes

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SIGN_IN:
			return { ...state, isSignedIn: true, userId: action.payload };
		case SIGN_OUT:
			return { ...state, isSignedIn: false, userId: null };
		default:
			return state;
	}
};
