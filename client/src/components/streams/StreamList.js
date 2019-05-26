import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";

class StreamList extends Component {
	componentDidMount() {
		this.props.fetchStreams();
	}

	//Helper function to find current user and display edit delete buttons accordingly
	renderEditDelete(stream) {
		if (stream.userId === this.props.currentUserId) {
			return (
				<div className="right floated content">
					<button className="ui button primary">Edit</button>
					<button className="ui button negative">Delete</button>
				</div>
			);
		}
	}

	renderList() {
		return this.props.streams.map(stream => {
			return (
				<div className="item" key={stream.id}>
					{this.renderEditDelete(stream)}
					<i className="large middle aligned icon camera" />
					<div className="content">
						{stream.title}
						<div className="description">{stream.description}</div>
					</div>
				</div>
			);
		});
	}

	render() {
		return (
			<div>
				<h2>Streams</h2>
				<div className="ui celled list">{this.renderList()}</div>
			</div>
		);
	}
}

//Get list of streams available as props inside component
//Object.values = takes all values inside of the object and turns into an array
const mapStateToProps = state => {
	return {
		streams: Object.values(state.streams),
		currentUserId: state.auth.userId
	};
};

export default connect(
	mapStateToProps,
	{ fetchStreams }
)(StreamList);
