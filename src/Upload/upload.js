import React from 'react'

const upload = (props) => {
	
    
	return (
		<div className="uploadContainer">
			<input className="selectFile" id={"upload"+props.id} type="file" multiple onChange={props.file}/>
			<button className="uploadButton" onClick={props.upload}>Upload</button>
		</div>
		
	) 
}

export default upload;