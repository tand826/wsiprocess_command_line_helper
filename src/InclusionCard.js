import React, { Component } from 'react'
import './Card.css'


class InclusionCard extends Component {
	render() {
		const {
			title,
			question,
		} = this.props;

		return (
			<div className="Card">
				<div className="title optional">{title}</div>
				<div className="question">{question}</div>
				<input type="file"/>
			</div>
		);
	}
}

export default InclusionCard