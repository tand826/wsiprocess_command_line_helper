import React, { Component } from 'react'
import './Card.css'


class TaskCard extends Component {
	render() {
		const {
			title,
			question,
		} = this.props;

		return (
			<div className="Card">
				<div className="title">{title}</div>
				<div className="question">{question}</div>
				<div className="radiobutton">
					<div className="task">Classification</div>
					<div className="task">Detection</div>
					<div className="task">Segmentation</div>
					<div className="task">Not Specified</div>
				</div>
			</div>
		);
	}
}

export default TaskCard