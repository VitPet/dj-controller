import React from 'react'
import ReactAudioPlayer from 'react-audio-player';

const person = (props) => {
	
	return (
		<div className="info-block">
			<p onClick={props.click} className="para">I'm a {props.name} and I'm {props.age} y.o. </p>
			<p>{props.children}</p>
			
			<input onChange={props.changename} type="text" value={props.name}/>
			<ReactAudioPlayer
  				src={props.uploadedFile}
			  	controls
			/>

			<input type="file" onChange={props.file}/>
			<button onClick={props.upload}>Upload</button>
		</div>
		
	) 
}

export default person;