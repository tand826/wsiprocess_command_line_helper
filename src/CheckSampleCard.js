import React, { Component } from 'react'
import './Card.css'


class CheckSampleCard extends Component {
	render() {
		const {
			title,
			question,
		} = this.props;

		return (
			<div className="Card">
				<div className="title optional">{title}</div>
				<div className="question">{question}</div>
				<div className="radiobutton"></div>
			</div>
		);
	}
}

export default CheckSampleCard