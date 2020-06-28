import React from 'react'
import {constantsStore} from "../../config/store";

class StateHandler extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            updatable: false,
            order: '',
            value: props.value,
            status: props.status

        }
    }

    handleValueChange(e) {
        let action = "SET" + this.props.order.toUpperCase()
        constantsStore.dispatch({type: action, value: parseInt(e)})
    }

    render() {
        let val = constantsStore.getState()[this.props.order]

        return (
            <input
                type='number'
                value={val}
                name={this.props.order}
                onChange={e => this.handleValueChange(e.target.value)}
            />
        )

    }
}

export default StateHandler