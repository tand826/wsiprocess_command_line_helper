import React, { Component } from 'react'
import './Card.css'


class Card extends Component {
	render() {
		const {
			title,
			className,
			question,
			content,
			state,
			required
		} = this.props;

		function Title() {
			if (required === "True") {
				return <div className="title required">{title}</div>
			} else if (required === "False") {
				return <div className="title optional">{title}</div>
			} else if (required === "Ready") {
				return <div className="title ready">{title}</div>
			}
		}

		function Content() {
			if (content === "fileSelect") {
				return <div className="content"><input id={className} type="file"/></div>
			} else if (content === "directorySelect") {
				return <div className="content"><input id={className} type="file" webkitdirectory="true" directory /></div>
			} else if (content.startsWith("radio")) {
				const contents = content.split(" ").slice(1,)
				var radios = Array([])
				contents.forEach (contentName => {
					radios.push(<div className="content radio"><input class={className} type="radio"/>{contentName}</div>)
				})
				return radios
			} else if (content.startsWith("checkbox")) {
				const contents = content.split(" ").slice(1,)
				var checkboxes = Array([])
				contents.forEach (contentName => {
					checkboxes.push(<div className="content checkbox"><input id={contentName} class={className} type="checkbox"/>{contentName}</div>)
				})
				return checkboxes
			} else if (content.startsWith("param")) {
				const contents = content.split(" ").slice(1,)
				var params = Array([])
				for (var i = 0; i < contents.length; i++) {
					var paramName = contents[i]
					var paramDefault = contents[i+1]
					i++
					params.push(<div className="content param">{paramName}<input type="text" className="parambox" id={paramName} defaultValue={paramDefault}/></div>)
				}
				return params
			} else if (content === "result") {
				return <div id="result"></div>
			}
		}

		function RenderResult() {
			const wsi = document.getElementById("wsi").value
			let task
			var task_radioboxes = document.getElementsByClassName("task")
			var tasks = Array(["classification", "detection", "segmentation", "none"])
			for (var i=1; i<task_radioboxes.length; i++) {
				if (task_radioboxes[i].checked === true) {
					if (i === 0){}
					task = tasks[i]
				}
			}
			const annotation = document.getElementById("annotation").value
			const inclusion = document.getElementById("inclusion").value
			const patchwidth = document.getElementById("PatchWidth").value
			const patchheight = document.getElementById("PatchHeight").value
			const overlapwidth = document.getElementById("OverlapWidth").value
			const overlapheight = document.getElementById("OverlapHeight").value
			const onannotation = document.getElementById("onAnnotation").value
			const onforeground = document.getElementById("onforeground").value
			const saveto = document.getElementById("saveTo").value
			const startsample = document.getElementById("Start").checked
			const finishedsample = document.getElementById("Finished").checked
			var command = wsi + " " + task
			if (annotation) {
				command += " --an " + annotation
			}
			if (inclusion) {
				command += " --in " + inclusion
			}
			command += " --pw " + patchwidth + " --ph " + patchheight + " --ow " + overlapwidth + " --oh " + overlapheight
			command += " --oa " + onannotation + " --of " + onforeground
			if (saveto) {
				command += " --st " + saveto
			}
			if (startsample) {
				command += " --ss"
			}
			if (finishedsample) {
				command += " --fs "
			}
			document.getElementById("result").innerHTML = command
		}

		function Transition() {
			var buttons = Array([])
			if (className === "checkSample"){
				buttons.push(<input type="button" className="back" value="Back"/>)
				buttons.push(<input type="button" className="Next" value="Next"/>)
			} else if (className === "command"){
				buttons.push(<input type="button" className="Next" value="Try Again?"/>)
			} else {
				buttons.push(<input type="button" className="back" value="Back"/>)
				buttons.push(<input type="button" className="Next" value="Next"/>)
			}
			return buttons
		}

		return (
			<div className='Card' style={{ display: state ? 'none' : '' }}>
				<Title/>
				<div className="question">{question}</div>
				<Content/>
				<div className="transition">
					<Transition/>
				</div>
			</div>
		);
	}
}

export default Card