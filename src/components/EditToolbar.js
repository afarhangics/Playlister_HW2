import React from "react";

export default class EditToolbar extends React.Component {

      keydownHandler = (e) => {
        const { canUndo, canRedo, undoCallback, redoCallback} = this.props;
        if(e.key==='z' && e.ctrlKey && canUndo) undoCallback();
        else if(e.key==='y' && e.ctrlKey && canRedo) redoCallback();
      }
      
      componentDidMount(){
        document.addEventListener('keydown',this.keydownHandler);
      }

      componentWillUnmount(){
        document.removeEventListener('keydown',this.keydownHandler);
      }

    render() {
        const { canAddSong, canUndo, canRedo, canClose, 
                undoCallback, redoCallback, closeCallback,
                addSongCallback } = this.props;
        let addSongClass = "toolbar-button";
        let undoClass = "toolbar-button";
        let redoClass = "toolbar-button";
        let closeClass = "toolbar-button";
        if (canAddSong) addSongClass += " disabled";
        if (canUndo) undoClass += " disabled";
        if (canRedo) redoClass += " disabled";
        if (canClose) closeClass += " disabled";
        return (
            <div id="edit-toolbar">
            <input 
                type="button" 
                id='add-song-button' 
                value="+" 
                className={addSongClass}
                onClick={addSongCallback}
                disabled={!canAddSong}
            />
            <input 
                type="button" 
                id='undo-button' 
                value="⟲" 
                className={undoClass} 
                onClick={undoCallback}
                disabled={!canUndo}
            />
            <input 
                type="button" 
                id='redo-button' 
                value="⟳" 
                className={redoClass} 
                onClick={redoCallback}
                disabled={!canRedo}
            />
            <input 
                type="button" 
                id='close-button' 
                value="&#x2715;" 
                className={closeClass} 
                onClick={closeCallback}
                disabled={!canClose}
            />
        </div>
        )
    }
}