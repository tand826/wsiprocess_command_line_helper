import React, { Component } from 'react'
import './Card.css'


class Card extends Component {
	render() {
		const {
			title,
			question,
			choices
		} = this.props;

		return (
			<div className="Card">
				<div className="title">{title}</div>
				<div className="question">{question}</div>
				<div className="choices">{choices}</div>
				<div className="command"></div>
			</div>
		);
	}
}

export default Card