import React, { Component } from 'react'
import './Card.css'


class OnDetailCard extends Component {
	render() {
		const {
			title,
			question,
		} = this.props;

		return (
			<div className="Card">
				<div className="title">{title}</div>
				<div className="question">{question}</div>
				<div className="onAnnotation"></div>
				<div className="onForeground"></div>
			</div>
		);
	}
}

export default OnDetailCard