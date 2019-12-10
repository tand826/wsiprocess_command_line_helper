import React, { Component } from 'react'
import './Card.css'


class SaveToCard extends Component {
	render() {
		const {
			title,
			question,
		} = this.props;

		return (
			<div className="Card">
				<div className="title">{title}</div>
				<div className="question">{question}</div>
				<input type="file"/>
			</div>
		);
	}
}

export default SaveToCard