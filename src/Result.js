import React, { Component } from 'react'
import './Card.css'

class Result extends Component {
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
			if (required === "Ready") {
				return <div className="title ready">{title}</div>
			}
		}



		function Result() {
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
			return command
		}

		return (
			<div className='Card' style={{ display: state ? 'none' : '' }}>
				<Title/>
				<div className="question">{question}</div>
				<Result/>
				<div className="transition">
					<input type="button" className="tryAgain" value="Try Again"/>
				</div>
			</div>
		);
	}
}

export default Result