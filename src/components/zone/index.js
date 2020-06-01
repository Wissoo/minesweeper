import React from 'react'

import {connect} from "react-redux";
import {namespacedAction} from "redux-subspace";

import {constants, zoneStore} from "../../config/store";
import {check} from "../../config/actions";

class Zone extends React.Component {
    constructor(props) {
        super(props);
        this.handleLeftTarget = this.handleLeftTarget.bind(this);
        this.handleRightTarget = this.handleRightTarget.bind(this);
    }

    /**
     * MOUSE EVENT
     */
    handleLeftTarget(e) {
        e.preventDefault()
        // SHOW OVERLAY IF CLICK WITH ENDGAME
        console.log("click")
        if (constants.getState().endgame) {
            constants.dispatch({type: 'PAUSE'})
        // ALSO CHECK ZONE IF NOT SHOWED ANYMORE
        } else {
            if (!this.props.highlight && this.props.hidden) {
                check(this.props.position)
            }
        }
    }

    handleRightTarget(e) {
        e.preventDefault()
        if (this.props.hidden) {
            zoneStore.dispatch(namespacedAction('' + this.props.position)({type: 'HIGHLIGHT'}))
        }
    }

    render() {
        let classname = 'zone'
        classname += (this.props.mined) ? ' mined' : ''
        // classname += (this.props.hidden) ? ' hidden' : ''
        classname += (this.props.highlight) ? ' highlight' : ''

        return (
            <div
                className={classname}
                onClick={(this.props.hidden || constants.getState().endgame) ? (this.handleLeftTarget) : (() => {})}
                onContextMenu={this.handleRightTarget}
                style={{
                    gridColumn: this.props.position % constants.getState().column,
                    width: constants.getState().zonePixelSize - 2 + 'px',
                    height: constants.getState().zonePixelSize - 2 + 'px',
                    lineHeight: constants.getState().zonePixelSize - 2 + 'px',
                }}
            >
                {(this.props.minedNeighbours && !this.props.mined && !constants.getState().endgame)
                //{{(!this.props.hidden && this.props.minedNeighbours && !this.props.mined && !constants.getState().endgame)}
                    ? this.props.minedNeighbours : ''}
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return state.zones[ownProps['position']]
}

export default connect(mapStateToProps)(Zone)