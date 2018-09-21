import React from 'react'

const controller = (props) => {
	
	return (
		<div className="controller-wrapper" >
			<div className="controller-name">
				General Controller
			</div>
			<div className="controls">
				<div className="displayVolume">
					Volume {(props.generalvolume*100).toFixed(0)}
				</div>
				<div className="controls">
					<input type="range" onChange={props.generalvolumechange} step="0.01" min="0" max="1" value={props.generalvolume}/>
				</div>
			</div>
			
		</div>
	) 
}

export default controller;