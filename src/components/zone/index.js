import React from 'react'
import {connect} from "react-redux";
import {constantsStore, zoneStore} from "../../config/store";

import {globalAction, namespacedAction} from "redux-subspace";
import {neighbourhood} from "../../config/actions";

class Zone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gridColumn: 0
        }

        this.handleLeftTarget = this.handleLeftTarget.bind(this);
        this.handleRightTarget = this.handleRightTarget.bind(this);
    }

    componentWillUpdate(nextProps, nextState, snapshot) {
        if (this.props.hidden !== nextProps.hidden && !nextProps.hidden && constantsStore.getState().endgame === 0) {
            this.check()
        }
    }

    /**
     * MOUSE EVENT
     */
    handleLeftTarget(e) {
        e.preventDefault()
        if (this.props.hidden && !this.props.highlight) {
            zoneStore.dispatch(namespacedAction(this.props.position.toString())({type: 'SHOW'}))
        }
    }

    handleRightTarget(e) {
        e.preventDefault()
        if (this.props.hidden) {
            zoneStore.dispatch(namespacedAction('' + this.props.position)({type: 'HIGHLIGHT'}))
        }
    }

    check() {
        constantsStore.dispatch({type: 'CHECKER', position: this.props.position})

        if (this.props.mined) {
            constantsStore.dispatch({type: 'LOSE'})
            zoneStore.dispatch(globalAction({type: 'SHOW'}))
        } else {
            // ENDGAME IF ALL ZONE ARE SHOWED
            if (Object.keys(zoneStore.getState()).length === Object.keys(constantsStore.getState().checked).length) {
                constantsStore.dispatch({type: 'WIN'})
                zoneStore.dispatch(globalAction({type: 'SHOW'}))
            }
        }

        if (!this.props.minedNeighbours) {
            // CHECK ARROUND
                neighbourhood(this.props.position).filter(x =>
                    !Object.values(constantsStore.getState().checked).includes(x)
                ).map(e =>
                    zoneStore.dispatch(namespacedAction(e.toString())({type: 'SHOW'}))
                )
        }
    }

    render() {
        let bgColor = 'green'
        bgColor = (this.props.mined) ? 'red' : bgColor
        bgColor = (this.props.hidden) ? 'grey' : bgColor
        bgColor = (this.props.highlight) ? 'yellow' : bgColor

        return (
            <div
                className='zone'
                onClick={this.handleLeftTarget}
                onContextMenu={this.handleRightTarget}
                style={{
                    gridColumn: this.props.gridColumn,
                    width: constantsStore.getState().zonePixelSize - 2 + 'px',
                    height: constantsStore.getState().zonePixelSize - 2 + 'px',
                    lineHeight: constantsStore.getState().zonePixelSize - 2 + 'px',
                    backgroundColor: bgColor
                }}
            >
                {(!this.props.hidden && this.props.minedNeighbours && !this.props.mined) ? this.props.minedNeighbours : ''}
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return state.zones[ownProps['position']]
}

export default connect(mapStateToProps)(Zone)