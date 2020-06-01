import * as actionType from '../../config/actions';

export const initialState = {
    pause: false,
    endgame: false,
    column: 10,
    row: 10,
    zonePixelSize: 20,
    mineNumber: 10,
    checked: {}
}

function matrix(state = initialState, action) {
    switch (action.type) {
        case actionType.ADDCHECKED:
            return {...state, checked: {...state.checked, [action.position]: action.position}}
        case actionType.PAUSE:
            return {...state, pause: true}
        case actionType.PLAY:
            return {...state, pause: false}
        case actionType.END:
            return {...state, endgame: true, checked: action.zones}
        case actionType.RESET:
            return {...state, endgame: false}
        default:
            return state
    }
}

export default matrix
