import React from "react";
import ReactDOM from "react-dom";
import history from "../history";

//Creating a portal, first argument JSX
//Second argument to HTML

// onClick history.push() exits modal popup
// onClick evt prevent modal exit inside modal window
const Modal = props => {
	return ReactDOM.createPortal(
		<div
			onClick={() => history.push("/")}
			className="ui dimmer modals visible active"
		>
			<div
				onClick={evt => evt.stopPropagation()}
				className="ui standard modal visible active"
			>
				<div className="header">Delete Stream</div>
				<div className="content">Are you sure you want to delete this stream?</div>
				<div className="actions">
					<button className="ui primary button">Delete</button>
					<button className="ui button">Cancel</button>
				</div>
			</div>
		</div>,
		// Rendered into div with id modal in index HTML
		document.querySelector("#modal")
	);
};

export default Modal;
