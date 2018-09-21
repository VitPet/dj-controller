import React, { Component } from 'react';

import './App.css';

import Mixer from "./Mixer/mixer"
import Controller from "./Controller/controller"
import Library from "./Library/library"

class App extends Component {
    
    state = {
    
        mixers:[
            {isPlaying: false, volume: 1, seekPosition: 0, playBackRate: 1, selectedFile: null, uploadedFile: null, startPosition: null, endPosition: null, currentTime: null, id: "m1"},
            {isPlaying: false, volume: 1, seekPosition: 0, playBackRate: 1, selectedFile: null, uploadedFile: null, startPosition: null, endPosition: null, currentTime: null, id: "m2"}
        ],
        controller: {
            generalVolume: 1
        },
        library: [
            {id: "l1", trackList: [], songIds: []},
            {id: "l2", trackList: [], songIds: []}
        ],
        showPersons: false
    }
    
    fileSelectedHandler = (event, id) => {
        
        const mixerIndex = this.state.mixers.findIndex(p => {
            return p.id === id;
        });
        console.log(mixerIndex)
        
        const mixer = {...this.state.mixers[mixerIndex]}
        const library = {...this.state.library[mixerIndex]}

        if(event.target.files.length > 0){
            for(let i = 0; i < event.target.files.length; i++){
                library.trackList.push(event.target.files[i].name)
                library.songIds.push(i)
            }
            
        }
        
        console.log(this.state.library[0].trackList)
        const mixers = [...this.state.mixers]
        mixers[mixerIndex] = mixer;
        
        this.setState({mixers : mixers});
    
    }
    selectTrackHandler = (event, id) => {
        const mixerIndex = this.state.mixers.findIndex(p => {
            return p.id === id;
        });
        const mixer = {...this.state.mixers[mixerIndex]}
        console.log(event.target.value)
        mixer.uploadedFile = event.target.value;

        console.log(this.state.mixers)
        const mixers = [...this.state.mixers];
        mixers[mixerIndex] = mixer;
        this.setState({mixers : mixers});
    }
    fileUploadHandler = (id) =>{
        const mixerIndex = this.state.mixers.findIndex(p => {
            return p.id === id;
        });
        document.querySelector("#upload"+mixerIndex+"").click();
    }
    
    seekChangeHandler = (event, id) => {
        const mixerIndex = this.state.mixers.findIndex(p => {
            return p.id === id;
        });
        console.log(event.nativeEvent.offsetX)
        console.log(event.nativeEvent.toElement.clientWidth)
        const percent = event.nativeEvent.offsetX / event.nativeEvent.toElement.clientWidth;
        console.log(percent)
        const mixer = {...this.state.mixers[mixerIndex]}
        mixer.currentTime = percent * mixer.endPosition
        mixer.seekPosition = percent / 100;
        const mixers = [...this.state.mixers];
        mixers[mixerIndex] = mixer;
        this.setState({mixers : mixers}, function(){
            document.querySelector("#m"+mixerIndex+"").currentTime = Number(this.state.mixers[mixerIndex].currentTime)
        });       
    }
    playbackChangeHandler = (event, id) => {
        const mixerIndex = this.state.mixers.findIndex(p => {
            return p.id === id;
        });
        console.log(mixerIndex)
        const mixer = {...this.state.mixers[mixerIndex]}
        mixer.playBackRate = event.target.value;
        console.log(event.target.value)
        const mixers = [...this.state.mixers];
        mixers[mixerIndex] = mixer;
        this.setState({mixers : mixers}, function(){
                document.querySelector("#m"+mixerIndex+"").playbackRate = Number(this.state.mixers[mixerIndex].playBackRate)
            }
        );
    }
    timeUpdateHandler = (id) =>{
        const mixerIndex = this.state.mixers.findIndex(p => {
            return p.id === id;
        });
        
        const mixer = {...this.state.mixers[mixerIndex]}
        
        mixer.currentTime = document.querySelector("#m"+mixerIndex+"").currentTime;
        mixer.seekPosition = document.querySelector("#m"+mixerIndex+"").currentTime;
        console.log(this.state.library[mixerIndex].trackList.indexOf(mixer.uploadedFile))
        const songIndex = this.state.library[mixerIndex].trackList.indexOf(mixer.uploadedFile)
        
        if ((Math.floor(mixer.endPosition)).toFixed() == (Math.floor(mixer.currentTime)).toFixed()){
            mixer.uploadedFile = this.state.library[mixerIndex].trackList[songIndex+1]
        }
        const mixers = [...this.state.mixers];
        mixers[mixerIndex] = mixer;
        this.setState({mixers : mixers}) 
    }
    volumeChangeHandler = (event, id) => {
        const mixerIndex = this.state.mixers.findIndex(p => {
            return p.id === id;
        });
        console.log(mixerIndex)
        const mixer = {...this.state.mixers[mixerIndex]}
        mixer.volume = event.target.value;
        console.log(event.target.value)
        const mixers = [...this.state.mixers];
        mixers[mixerIndex] = mixer;
        this.setState({mixers : mixers}, function(){        
                document.querySelector("#m"+mixerIndex+"").volume = Number(this.state.mixers[mixerIndex].volume * this.state.controller.generalVolume);
            }
        );
    }
    generalVolumeChange = (event) => {
        
        console.log(this.state.controller)
        const controller = {...this.state.controller}
        controller.generalVolume = Number(event.target.value)
        console.log(event.target.value)

        const length = this.state.mixers.length;
        console.log(length)
        this.setState({controller : controller}, function(){  
            for (let i = 0; i < length; i++){

                document.querySelector("#m"+i+"").volume = this.state.mixers[i].volume * controller.generalVolume;    
            }      
            
        })
    }
    nextMusicHandler = (id) => {
        const mixerIndex = this.state.mixers.findIndex(p => {
            return p.id === id;
        });

        const mixer = {...this.state.mixers[mixerIndex]}

        const songIndex = this.state.library[mixerIndex].trackList.indexOf(mixer.uploadedFile)

        if(this.state.library[mixerIndex].trackList.length > songIndex){
            mixer.uploadedFile = this.state.library[mixerIndex].trackList[songIndex+1]
        }else{
            mixer.uploadedFile = this.state.library[mixerIndex].trackList[1]
        }
        const mixers = [...this.state.mixers];
        mixers[mixerIndex] = mixer;
        this.setState({mixers : mixers}, function(){
            if(this.state.mixers[mixerIndex].isPlaying){
                document.querySelector("#m"+mixerIndex+"").play();
            }else{
                document.querySelector("#m"+mixerIndex+"").pause();
            } 
        });
    }
    toStartMusicHandler = (id) => {
        const mixerIndex = this.state.mixers.findIndex(p => {
            return p.id === id;
        });

        const mixer = {...this.state.mixers[mixerIndex]}

        mixer.currentTime = 0;
        const mixers = [...this.state.mixers];
        mixers[mixerIndex] = mixer;
        this.setState({mixers : mixers}, function(){
            document.querySelector("#m"+mixerIndex+"").currentTime = 0;
        });
    }
    prevMusicHandler = (id) => {
        const mixerIndex = this.state.mixers.findIndex(p => {
            return p.id === id;
        });
        
        const mixer = {...this.state.mixers[mixerIndex]}

        const songIndex = this.state.library[mixerIndex].trackList.indexOf(mixer.uploadedFile)
        
        console.log("222")
        if(songIndex > 0){
            mixer.uploadedFile = this.state.library[mixerIndex].trackList[songIndex-1]
        }else{
            mixer.uploadedFile = this.state.library[mixerIndex].trackList[1]
        }
        const mixers = [...this.state.mixers];
        mixers[mixerIndex] = mixer;
        this.setState({mixers : mixers}, function(){
            if(this.state.mixers[mixerIndex].isPlaying){
                document.querySelector("#m"+mixerIndex+"").play();
            }else{
                document.querySelector("#m"+mixerIndex+"").pause();
            } 
    });
    }   
    playMusicHandler = (id) => {
        const mixerIndex = this.state.mixers.findIndex(p => {
            return p.id === id;
        });
        
        const mixer = {...this.state.mixers[mixerIndex]}
        if(mixer.uploadedFile){
            mixer.isPlaying = !mixer.isPlaying;
            mixer.startPosition = document.querySelector("#m"+mixerIndex+"").seekable.start(0);
            mixer.currentTime = document.querySelector("#m"+mixerIndex+"").currentTime;
            mixer.endPosition = document.querySelector("#m"+mixerIndex+"").seekable.end(0);
        }
        const mixers = [...this.state.mixers];
        mixers[mixerIndex] = mixer;
        this.setState({mixers : mixers}, function(){
            if(this.state.mixers[mixerIndex].isPlaying){
                document.querySelector("#m"+mixerIndex+"").play();
            }else{
                document.querySelector("#m"+mixerIndex+"").pause();
            } 
    });
        
           
    }
    render() {
        let style = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "14px",
            minHeight: "500px"

        }

        return (
            <div className="App" style = {style}>                
                {
                    this.state.mixers.map((mixer, index) => {
                        return <div>
                            <Mixer
                                id = {index}                         
                                time = {this.state.mixers[index].currentTime}
                                playback = {this.state.mixers[index].playBackRate}
                                start = {this.state.mixers[index].startPosition}
                                end = {this.state.mixers[index].endPosition}
                                seekposition = {this.state.mixers[index].seekPosition}
                                volume = {this.state.mixers[index].volume}
                                timeupdatehandler = {(event) => this.timeUpdateHandler(mixer.id)}
                                playbackhandler = {(event) => this.playbackChangeHandler(event, mixer.id)}
                                volumehandler = {(event) => this.volumeChangeHandler(event, mixer.id)}
                                seekhandler = {(event) => this.seekChangeHandler(event, mixer.id)}
                                play = {() => this.playMusicHandler(mixer.id)}
                                next = {() => this.nextMusicHandler(mixer.id)}
                                prev = {() => this.prevMusicHandler(mixer.id)}
                                tostart = {() => this.toStartMusicHandler(mixer.id)}
                                uploadedFile = {this.state.mixers[index].uploadedFile}
                                upload = {() => this.fileUploadHandler(mixer.id)}
                                file = {(event) => this.fileSelectedHandler(event, mixer.id)}
                                filename = {this.state.mixers[index].uploadedFile}

                            />
                            <Library 
                                tracklist = {this.state.library[index].trackList}
                                selecttrackhandler = {(event) => this.selectTrackHandler(event, mixer.id)}
                            />
                        </div>
                    })
                }
                <Controller
                    generalvolumechange = {(event) => this.generalVolumeChange(event)}
                    generalvolume = {this.state.controller.generalVolume}

                />

            </div>
        );

    }
    
    

}

export default App;
