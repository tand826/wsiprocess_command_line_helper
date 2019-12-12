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
					radios.push(<div className="content radio"><label><input name={className} class={className} type="radio"/>{contentName}</label></div>)
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
			const wsi = document.getElementById("wsi").value.split("\\")[2]
			var task
			var task_radioboxes = document.getElementsByClassName("task")
			const tasks = Array(["classification", "detection", "segmentation", "none"])
			for (var i=1; i < 4; i++) {
				if (task_radioboxes[i].checked) {
					task = tasks[0][i-1]
				}
			}
			const annotation = document.getElementById("annotation").value.split("\\")[2]
			const inclusion = document.getElementById("inclusion").value.split("\\")[2]
			const patchwidth = document.getElementById("PatchWidth").value
			const patchheight = document.getElementById("PatchHeight").value
			const overlapwidth = document.getElementById("OverlapWidth").value
			const overlapheight = document.getElementById("OverlapHeight").value
			const onannotation = document.getElementById("OnAnnotation").value
			const onforeground = document.getElementById("OnForeground").value
			const saveto = document.getElementById("saveTo").value.split("\\")[2]
			const startsample = document.getElementById("Start").checked
			const finishedsample = document.getElementById("Finished").checked
			var command = "wsiprocess " +  wsi + " " + task
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

		let ToPreviousCard = (page) => {
			var currentCard = document.getElementsByClassName(page)[0]
			currentCard.style.display = "none"

			const currentIndex = pages[0].indexOf(page)
			const backCardName = pages[0][currentIndex - 1]
			var backCard = document.getElementsByClassName("Card " + backCardName)[0]
			backCard.style.opacity = 0
			backCard.style.display = ""
			backCard.classList.add("show")
		}

		let ToNextCard = (page) => {
			if (["wsi", "task"].includes(page)) {
				if (!ValidateInput(page)) {
					AskForInput(page)
					return;
				}
			}
			var currentCard = document.getElementsByClassName(page)[0]
			currentCard.style.display = "none"

			const currentIndex = pages[0].indexOf(page)
			const nextCardName = pages[0][currentIndex + 1]
			var nextCard = document.getElementsByClassName("Card " + nextCardName)[0]
			nextCard.style.opacity = 0
			nextCard.style.display = ""
			nextCard.classList.add("show")

			var task = GetTaskName()
			console.log(task)
			if (page === "task" && task === "detection") {
				document.getElementById("OnAnnotation").value = 0.01
				document.getElementById("OnForeground").value = 0.8
			}
		}

		let ValidateInput = (page) => {
			if (page === "wsi") {
				const wsi = document.getElementById("wsi").value
				return wsi
			} else if (page === "task") {
				var task_radioboxes = document.getElementsByClassName("task")
				for (var i=1; i < 5; i++) {
					if (task_radioboxes[i].checked) {
						return true
					}
				}
				return false
			}
		}

		let AskForInput = (page) => {
			alert("You need to set a " + page + " on this card.")
		}

		let GetTaskName = () => {
			var task
			var task_radioboxes = document.getElementsByClassName("task")
			const tasks = Array(["classification", "detection", "segmentation", "none"])
			for (var i=1; i < 5; i++) {
				if (task_radioboxes[i].checked) {
					task = tasks[0][i-1]
				}
			}
			return task
		}

		let ToFirstCard = (page) => {
			var currentCard = document.getElementsByClassName(page)[0]
			currentCard.style.display = "none"

			var nextCard = document.getElementsByClassName("Card wsi")[0]
			nextCard.style.display = ""
			nextCard.style.opacity = 0
			nextCard.classList.add("show")
		}

		let ToFinalCard = (page) => {
			var currentCard = document.getElementsByClassName(page)[0]
			currentCard.style.display = "none"

			const currentIndex = pages[0].indexOf(page)
			const nextCardName = pages[0][currentIndex + 1]
			var nextCard = document.getElementsByClassName("Card " + nextCardName)[0]
			nextCard.style.opacity = 0
			nextCard.style.display = ""
			nextCard.classList.add("show")

			RenderResult()
		}

		// not fully implemented && not used
		let ToClipBoard = () => {
			var copyTarget = document.getElementById("result").innerHTML
			document.execCommand("Copy")
			alert("Copied : " + copyTarget.value)
		}

		function Transition() {
			var buttons = Array([])
			if (className === "wsi") {
				buttons.push(<input type="button" className="back" value="Back" style={{visibility: "hidden"}}/>)
				buttons.push(<input type="button" className="next" value="Next" onClick={() => ToNextCard(className)}/>)
			} else if (className === "checkSample"){
				buttons.push(<input type="button" className="back" value="Back" onClick={() => ToPreviousCard(className)}/>)
				buttons.push(<input type="button" className="next" value="Next" onClick={() => ToFinalCard(className)}/>)
			} else if (className === "command"){
				buttons.push(<input type="button" className="copy" value="Copy Command" onClick={() => ToClipBoard()} style={{visibility: "hidden"}}/>)
				buttons.push(<input type="button" className="next" value="Try Again?" onClick={() => ToFirstCard(className)}/>)
			} else {
				buttons.push(<input type="button" className="back" value="Back" onClick={() => ToPreviousCard(className)}/>)
				buttons.push(<input type="button" className="next" value="Next" onClick={() => ToNextCard(className)}/>)
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
