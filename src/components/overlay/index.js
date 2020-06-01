import React from 'react'
import {constants} from "../../config/store";

class Overlay extends React.Component {
    /**
     * MOUSE EVENT
     */
    handlePlay() {
        constants.dispatch({type: 'PLAY'})
    }

    render() {
        return (
            <div
            className={'overlay'}>
                <button onClick={this.handlePlay} onContextMenu={this.handleRightTarget}>Play</button>
            </div>
        )
    }
}

export default Overlay