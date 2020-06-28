import React from 'react'
import {constantsStore} from "../../config/store";
import StateHandler from "../stateHandler";

class Overlay extends React.Component {
    /**
     * BOTTOM EVENT
     */
    handlePlay() {
        constantsStore.dispatch({type: 'OVERLAYOFF'})
    }

    render() {
        return (
            <div className={'overlay'} onContextMenu={(e) => (e.preventDefault())}>
                <h1>MINESWEEPER</h1>
                <h3>{(constantsStore.getState().endgame === 1 ? 'Win' : (constantsStore.getState().endgame === -1) ? 'Lose' : '')}</h3>
                <div className="menu">
                    <label>Grid Size</label>
                    <br/>
                    x
                    <StateHandler order="column"/>
                    y
                    <StateHandler order="row"/>
                    <br/>
                    <button onClick={this.handlePlay} onContextMenu={(e) => (e.preventDefault())}>GO</button>
                </div>
            </div>
        )
    }
}

export default Overlay