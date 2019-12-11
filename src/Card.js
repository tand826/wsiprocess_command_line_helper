import React, { Component } from 'react'
import './Card.css'


class Card extends Component {
	render() {
		const {
			title,
			question,
			content,
			state,
			required
		} = this.props;

		function Title() {
			if (required === "True") {
				return <div className="title required">{title}</div>
			} else {
				return <div className="title optional">{title}</div>
			}
		}

		function Content() {
			if (content === "fileSelect") {
				return <div className="content"><input type="file"/></div>
			} else if (content === "directorySelect") {
				return <div className="content"><input type="file" webkitDirectory directory /></div>
			} else if (content.startsWith("radio")) {
				const contents = content.split(" ").slice(1,)
				var radios = Array([])
				contents.forEach (contentName => {
					radios.push(<div className="content radio"><input type="radio"/>{contentName}</div>)
				})
				return radios
			} else if (content.startsWith("checkbox")) {
				const contents = content.split(" ").slice(1,)
				var checkboxes = Array([])
				contents.forEach (contentName => {
					checkboxes.push(<div className="content checkbox"><input type="checkbox"/>{contentName}</div>)
				})
				return checkboxes
			} else if (content.startsWith("param")) {
				const contents = content.split(" ").slice(1,)
				var params = Array([])
				for (var i = 0; i < contents.length; i++) {
					var paramName = contents[i]
					var paramDefault = contents[i+1]
					i++
					params.push(<div className="content param">{paramName}<input type="text" className="parambox" value={paramDefault}/></div>)
				}
				return params
			}
		}

		return (
			<div className="Card" style={{ display: state ? 'none' : '' }}>
				<Title/>
				<div className="question">{question}</div>
				<Content/>
				<div className="transition">
					<input type="button" className="back" value="Back"/>
					<input type="button" className="Next" value="Next"/>
				</div>
			</div>
		);
	}
}

export default Card