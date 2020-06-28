import React from "react"
import {connect} from "react-redux";
import {globalAction, namespacedAction} from "redux-subspace";

import Zone from "../zone";
import Overlay from "../overlay";
import store, {constantsStore, updateZone, zoneStore} from "../../config/store";
import {neighbourhood} from "../../config/actions";

class Matrix extends React.Component {
    constructor(props) {
        super(props);
        this.handleLeftTarget = this.handleLeftTarget.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState, snapshot) {
        const diffColumn = this.props.column !== nextProps.column
        const diffRow = this.props.row !== nextProps.row
        const diffChecked = this.props.checked !== nextProps.checked && Object.keys(nextProps.checked).length === 0
        const diffOverlay = this.props.overlay !== nextProps.overlay

        return diffColumn || diffRow || diffChecked || diffOverlay
    }

    componentWillUpdate(nextProps, nextState, snapshot) {
        const diffColumn = this.props.column !== nextProps.column
        const diffRow = this.props.row !== nextProps.row

        if (diffColumn || diffRow) {
            store.replaceReducer(updateZone(nextProps.column * nextProps.row))
        }

        if (!nextProps.overlay) {
            store.dispatch({type: 'NEWGAME'})
            this.reloadMine()
        }
    }

    reloadMine() {
        let number = this.props.mineNumber

        while (number > 0) {
            let index = Math.floor(Math.random() * Math.floor(Object.keys(zoneStore.getState()).length))
            if (!zoneStore.getState()[index].mined) {
                zoneStore.dispatch(namespacedAction(index.toString())({type: 'MINE'}))
                constantsStore.dispatch({type: 'CHECKER', position: index})

                zoneStore.dispatch(namespacedAction(index.toString())({type: 'INCREMENTNEIGHBOURHOOD'}))
                neighbourhood(index).map((e) => {
                    zoneStore.dispatch(namespacedAction(e.toString())({type: 'INCREMENTNEIGHBOURHOOD'}))
                    return null
                })
                number--
            }
        }
    }

    handleLeftTarget(e) {
        e.preventDefault()
        if (this.props.endgame) {
            constantsStore.dispatch({type: 'OVERLAYON'})
            store.dispatch(globalAction({type: 'RESET'}))
        }
    }

    render() {
        return (
            <div>
                <div
                    className='matrix'
                    style={{
                        gridTemplateColumns: 'repeat(' + this.props.zonePixelSize + ', 1fr)',
                        height: this.props.row * this.props.zonePixelSize,
                        width: this.props.column * this.props.zonePixelSize,
                    }}

                    onClick={this.handleLeftTarget}
                >
                    {
                        Object.keys(zoneStore.getState()).map((e, i) =>
                            <Zone key={i} position={i} gridColumn={i % this.props.column + 1}/>
                        )
                    }
                </div>
                {(this.props.overlay) && <Overlay/>}
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        ...state.constants
    }

}

export default connect(mapStateToProps)(Matrix)