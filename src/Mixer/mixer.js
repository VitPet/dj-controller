import React from 'react'
import Select from 'react-select';
const mixer = (props) => {
	
    
	return (
		<div className="mixer-wrapper">
			<audio 
				src = {props.uploadedFile}
			  	id = {"m"+props.id}
			  	onTimeUpdate = {props.timeupdatehandler}
				loop

			  	>
			</audio>
			<div className="track">
				{props.filename}
			</div>
			<div className="controls">
				<div className="seekRange">
					<span>{Math.floor(props.time/60) }:{(Math.floor(props.time % 60).toFixed(0)) < 10 ? "0" + (Math.floor(props.time % 60).toFixed(0)) : (Math.floor(props.time % 60).toFixed(0)) }</span>
					<span id="seekObjContainer">
				  <progress onClick={props.seekhandler} id="seekObj" value={props.time} max={props.end}></progress>
				</span>
					<span>{Math.floor(props.end/60) }:{(Math.floor(props.end % 60).toFixed(0)) < 10 ? "0" + (Math.floor(props.end % 60).toFixed(0)) : (Math.floor(props.end % 60).toFixed(0)) }</span>
				</div>
				
				<div className="displayVolume">
					Volume {(props.volume*100).toFixed(0)}
				</div>
				<div className="volumeRange">
					<input type="range" onChange={props.volumehandler} step="0.01" min="0" max="1" value={props.volume} />
				</div>
				<div className="displayPlayback">
					{props.playback}x
				</div>
				<div className="playbackRate">
					<input type="range" onChange={props.playbackhandler} step="0.1" min="0" max="2" value={props.playback} />
				</div>
			</div>
			
			<input className="selectFile" id={"upload"+props.id} type="file" multiple onChange={props.file}/>
			<button className="uploadButton" onClick={props.upload}>Upload</button>
			<button className="playButton" onClick={props.play}>Play</button>
			<button className="nextButton" onClick={props.next}>Next</button>
			<button className="stopButton" onClick={props.prev}>Prev</button>
			<button className="toStartButton" onClick={props.tostart}>Start</button>

		</div>
		
	) 
}

export default mixer;