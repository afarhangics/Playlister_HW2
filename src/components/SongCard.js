import React from "react";

export default class SongCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDragging: false,
            draggedTo: false
        }
    }
    handleClick = (event) => {
        event.stopPropagation();
        this.props.deleteCurrentSongCallback(this.props.index);
    }
    handleDoubleClick = (event) => {
        if (event.detail === 2) {
            this.props.editCurrentSongCallback(this.props.index);
        }
    }
    handleDragStart = (event) => {
        event.dataTransfer.setData("song", event.target.id);
        this.setState(prevState => ({
            isDragging: true,
            draggedTo: prevState.draggedTo
        }));
    }
    handleDragOver = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: true
        }));
    }
    handleDragEnter = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: true
        }));
    }
    handleDragLeave = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: false
        }));
    }
    handleDrop = (event) => {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.substring(target.id.indexOf("-") + 1);
        let sourceId = event.dataTransfer.getData("song");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        if(sourceId === "" || targetId === ""){
            alert("please drag the whole song card");
            return;
        }
        this.setState(prevState => ({
            isDragging: false,
            draggedTo: false
        }));
        // ASK THE MODEL TO MOVE THE DATA
        this.props.moveCallback(sourceId, targetId);
    }

    getItemNum = () => {
        return this.props.id.substring("playlist-song-".length);
    }

    render() {
        const { song } = this.props;
        let num = this.getItemNum();
        let itemClass = "list-card unselected-list-card playlister-song";
        if (this.state.draggedTo) {
            itemClass += " playlister-song-dragged-to";
        }
        return (
            <div
                id={'song-' + num}
                className={itemClass}
                onDragStart={this.handleDragStart}
                onDragOver={this.handleDragOver}
                onDragEnter={this.handleDragEnter}
                onDragLeave={this.handleDragLeave}
                onDrop={this.handleDrop}
                draggable="true"
                onClick={this.handleDoubleClick}
            >
               <span>{"" + num  + ". "} </span>
               <a className="playlist-link" href={"https://www.youtube.com/watch?v=" + song.youTubeId}> {song.title} by {song.artist} </a>
               
               <input 
                    type="button" 
                    id={"remove-song-" + num} 
                    className="list-card-button" 
                    onClick={this.handleClick}
                    value="&#x2715;" />

            </div>
        )
    }
}