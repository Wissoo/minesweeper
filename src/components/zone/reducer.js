import * as actionType from '../../config/actions';

export const initialState = {
    mined: false,
    hidden: true,
    highlight: false,
    minedNeighbours: 0,
}

function zone(state = initialState, action) {
    switch (action.type) {
        case actionType.MINE:
            return {...state, mined: true}

        case actionType.SHOW:
            return {...state, hidden: false, highlight: false}
        case actionType.HIDE:
            return {...state, hidden: true}

        case actionType.HIGHLIGHT:
            return {...state, highlight: !state.highlight}

        case actionType.INCREMENTNEIGHBOURHOOD:
            return {...state, minedNeighbours: state.minedNeighbours + 1}

        case actionType.RESET:
            return initialState
        default:
            return state
    }
}

export default zone
