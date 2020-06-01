import React from "react"
import {connect} from "react-redux";
import {namespacedAction} from "redux-subspace";

import Zone from "../zone";
import Overlay from "../overlay";
import {constants, zoneStore} from "../../config/store";
import {ADDCHECKED, neighbourhood} from "../../config/actions";

class Matrix extends React.Component {
    constructor(props) {
        super(props);
        this.randomMine = this.randomMine.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    /**
     * Mine random zones
     * @param number
     * @returns {null}
     */
    randomMine(number) {
        if (number > 0) {
            // RANDOM INDEX
            let index = Math.floor(Math.random() * Math.floor(this.props.zonesNumber.length)) + 1

            if (!zoneStore.getState()[index].mined) {
                zoneStore.dispatch(namespacedAction('' + index)({type: 'MINE'}))
                constants.dispatch({type: ADDCHECKED, position: index})
                neighbourhood(index).map(e => {
                    zoneStore.dispatch(namespacedAction('' + e)({type: 'INCREMENTNEIGHBOURHOOD'}))
                    return null
                })
                this.randomMine(number - 1)
            } else {
                this.randomMine(number)
            }
        }
        return null
    }

    componentDidMount() {
        this.randomMine(this.props.mineNumber)
    }

    render() {
        return (
            <div
                className={'matrix'}
                style={{
                    gridTemplateColumns: 'repeat(' + this.props.zonePixelSize + ', 1fr)',
                    height: this.props.row * this.props.zonePixelSize,
                    width: this.props.column * this.props.zonePixelSize,
                }}
            >
                {
                    (this.props.pause) ?
                        <Overlay/> :
                        this.props.zonesNumber.map((e, i) =>
                            <Zone position={i + 1}/>
                        )
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        zonesNumber: Object.keys(state.zones),
        ...state.constants
    }

}

export default connect(mapStateToProps)(Matrix)