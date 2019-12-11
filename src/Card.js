import React, { Component } from 'react'
import './Card.css'


export default class Card extends Component {
	render() {
		const {
			title,
			className,
			question,
			content,
			hidden,
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
			var task
			var task_radioboxes = document.getElementsByClassName("task")
			const tasks = Array(["classification", "detection", "segmentation", "none"])
			for (var i=1; i < 4; i++) {
				if (task_radioboxes[i].checked) {
					task = tasks[0][i]
				}
			}
			const annotation = document.getElementById("annotation").value
			const inclusion = document.getElementById("inclusion").value
			const patchwidth = document.getElementById("PatchWidth").value
			const patchheight = document.getElementById("PatchHeight").value
			const overlapwidth = document.getElementById("OverlapWidth").value
			const overlapheight = document.getElementById("OverlapHeight").value
			const onannotation = document.getElementById("OnAnnotation").value
			const onforeground = document.getElementById("OnForeground").value
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

		const pages = Array(["wsi", "task", "annotation", "inclusion", "sizes", "detail", "saveTo", "checkSample", "command"])

		let BackCard = (page) => {
			var currentCard = document.getElementsByClassName(page)[0]
			currentCard.classList.add("hide")
			currentCard.style.display = "none"

			const currentIndex = pages[0].indexOf(page)
			const backCardName = pages[0][currentIndex - 1]
			var backCard = document.getElementsByClassName("Card " + backCardName)[0]
			backCard.style.display = ""
			backCard.style.opacity = 0
			backCard.classList.add("show")
		}

		let NextCard = (page) => {
			var currentCard = document.getElementsByClassName(page)[0]
			currentCard.classList.add("hide")
			currentCard.style.display = "none"

			const currentIndex = pages[0].indexOf(page)
			const nextCardName = pages[0][currentIndex + 1]
			var nextCard = document.getElementsByClassName("Card " + nextCardName)[0]
			nextCard.style.display = ""
			nextCard.style.opacity = 0
			nextCard.classList.add("show")
		}

		function Transition() {
			var buttons = Array([])
			if (className === "wsi") {
				buttons.push(<input type="button" className="back" value="Back" onClick={() => BackCard(className)} style={{visibility: "hidden"}}/>)
				buttons.push(<input type="button" className="next" value="Next" onClick={() => NextCard(className)}/>)
			} else if (className === "checkSample"){
				buttons.push(<input type="button" className="back" value="Back" onClick={() => BackCard(className)}/>)
				buttons.push(<input type="button" className="next" value="Next" onClick={() => NextCard(className)}/>)
			} else if (className === "command"){
				buttons.push(<input type="button" className="back" value="Back" onClick={() => BackCard(className)} style={{visibility: "hidden"}}/>)
				buttons.push(<input type="button" className="next" value="Try Again?" onClick={() => NextCard(className)}/>)
			} else {
				buttons.push(<input type="button" className="back" value="Back" onClick={() => BackCard(className)}/>)
				buttons.push(<input type="button" className="next" value="Next" onClick={() => NextCard(className)}/>)
			}
			return buttons
		}

		return (
			<div className={['Card', className].join(' ')}  style={{ display: hidden ? 'none' : '' }}>
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
