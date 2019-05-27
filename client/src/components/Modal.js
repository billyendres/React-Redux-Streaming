import React from "react";
import ReactDOM from "react-dom";

//Creating a portal, first argument JSX
//Second argument to HTML

// onClick history.push() exits modal popup
// onClick evt prevent modal exit inside modal window
const Modal = props => {
	return ReactDOM.createPortal(
		<div onClick={props.onDismiss} className="ui dimmer modals visible active">
			<div
				onClick={evt => evt.stopPropagation()}
				className="ui standard modal visible active"
			>
				<div className="header">{props.title}</div>
				<div className="content">{props.check}</div>
				<div className="actions">{props.actions}</div>
			</div>
		</div>,
		// Rendered into div with id modal in index HTML
		document.querySelector("#modal")
	);
};

export default Modal;
