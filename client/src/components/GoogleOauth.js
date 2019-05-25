import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleOauth extends Component {
	//Removed Initial Component level state
	//Replaced state references with props and actions/ reducers

	//Setup for Oauth Vefification
	componentDidMount() {
		window.gapi.load("client:auth2", () => {
			window.gapi.client
				.init({
					clientId:
						"117768861076-afc46j8bs48nt61pkfddlq4t5d2che6i.apps.googleusercontent.com",
					scope: "email"
				})
				.then(() => {
					this.auth = window.gapi.auth2.getAuthInstance();
					this.onAuthChange(this.auth.isSignedIn.get());
					//Linked to onAuthChange Function
					this.auth.isSignedIn.listen(this.onAuthChange);
				});
		});
	}

	//Changed from component level state to redux
	//Once user signs in or out, calls appropriate action creator
	onAuthChange = isSignedIn => {
		if (isSignedIn) {
			//Takes current users unique google id
			//Will record which user created which stream
			this.props.signIn(this.auth.currentUser.get().getId());
		} else {
			this.props.signOut();
		}
	};

	//Sign In Helper for onClick Handler
	handleSignIn = () => {
		this.auth.signIn();
	};

	//Sign Out Helper for onClick Handler
	handleSignOut = () => {
		this.auth.signOut();
	};

	//Helper Function to check if User is signed in or not
	renderAuthButton() {
		if (this.props.isSignedIn === null) {
			return null;
		} else if (this.props.isSignedIn) {
			return (
				<button onClick={this.handleSignOut} className="ui red google button">
					<i className="google icon" />
					Sign Out
				</button>
			);
		} else {
			return (
				<button onClick={this.handleSignIn} className="ui red google button">
					<i className="google icon" />
					Sign In With Google
				</button>
			);
		}
	}

	//Calls helper function in render method
	render() {
		return <div>{this.renderAuthButton()}</div>;
	}
}

//Using mapStateToProps to rerender to the DOM
//Makes use of redux state rather than component level
const mapStateToProps = state => {
	return { isSignedIn: state.auth.isSignedIn };
};

//Wiring up to action creators
export default connect(
	mapStateToProps,
	{ signIn, signOut }
)(GoogleOauth);
