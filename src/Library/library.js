import React from 'react'

const library = (props) => {
	
    
	return (
		<div className="library-wrapper">
			<select onChange={props.selecttrackhandler}>
				<option selected="selected">
					Select track...
				</option>
		        {props.tracklist.map((track, index) => {
                    return <option> 
					  		{track}
                      	</option>
                		
                })}
			</select>
		</div>
		
	) 
}

export default library;